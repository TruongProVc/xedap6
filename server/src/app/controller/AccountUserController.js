const Account = require('../models/Account');
const Order =require('../models/Order');
const OrderDetail =require('../models/OrderDetail');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'saddasdasadsasdadsas'; 
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');

exports.getAllAccountsUser = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.json(accounts);
    } catch (error) {
        console.error('Error fetching all accounts:', error);
        res.status(500).json({ error: error.message });
    }
};

// admin
exports.getProfileUser = async (req, res) => {
    try {
        const user = req.user;
        console.log('User retrieved for profile:', user);
        res.json(user); 
    } catch (err) {
        console.error('Error retrieving user profile:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfileUser = async (req, res) => {
    const { lastname, firstname, gender, address, mobile } = req.body;
    const userId = req.user.userId;
    
    console.log('Update request body:', req.body);  // Log the request body

    try {
        const user = await Account.findOne({ where: { AccountId: userId } });
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        user.Lastname = lastname || user.Lastname;
        user.Firstname = firstname || user.Firstname;
        user.Gender = gender || user.Gender;
        user.Address = address || user.Address;
        user.Mobile = mobile || user.Mobile;

        await user.save();

        // Generate new token after updating user information
        const newToken = jwt.sign(
            {
                username: user.Username,
                userId: user.AccountId,
                email: user.Email,
                mobile: user.Mobile,
                address: user.Address,
                firstname: user.Firstname,
                lastname: user.Lastname,
                gender: user.Gender,
            },
            SECRET_KEY, // Use secret key from environment or config
            { expiresIn: '1h' } // Set token expiration time
        );

        res.json({
            message: 'Thông tin người dùng đã được cập nhật',
            user,
            token: newToken, // Return new token
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.changePasswordUser = async (req, res) => {
    const { oldPassword, newPassword } = req.body; 
    const userId = req.user.userId;  

    console.log('Change password request body:', req.body);  // Log the request body

    try {
        const user = await Account.findOne({ where: { AccountId: userId } });
        
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.Password);
        if (!isMatch) {
            console.error('Old password mismatch');
            return res.status(400).json({ error: 'Mật khẩu cũ không chính xác' });
        }

        // Validate new password
        if (newPassword.length < 8) {
            console.error('New password too short');
            return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 8 ký tự' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        user.Password = hashedPassword;
        await user.save();

        // Generate new token with updated user info
        const newToken = jwt.sign(
            {
                username: user.Username,
                userId: user.AccountId,
                email: user.Email,
                mobile: user.Mobile,
                address: user.Address,
                firstname: user.Firstname,
                lastname: user.Lastname,
                gender: user.Gender,
            },
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Mật khẩu đã được thay đổi thành công',
            token: newToken, // Return new token
        });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.getOrderUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Token không được cung cấp" });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user; 

       
        const customer = await Customer.findOne({
            where: { CustomerId: user.customerid },
        });
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng." });
        }
        const orders = await Order.findAll({
            where: { CustomerId: user.customerid },
            order: [["CreateAt", "DESC"]], 
        });
      
        console.log(orders)

        if (orders.length === 0) {
            return res
                .status(404)
                .json({ message: "Khách hàng này chưa có đơn hàng nào." });
        }

        // Trả về danh sách đơn hàng
        res.json({ customer, orders });
    } catch (err) {
        console.error("Error: ", err.message);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        res.status(500).json({ error: err.message });
    }
};
exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params; // Lấy orderId từ params

        const orderDetail = await OrderDetail.findAll({
            where: {OrderId: orderId}, 
            
            include: [{
                model: Product,
                as: "Product"
            },
        {
            model: Order,
            as:"Order" 
        }]
        });
        if (!orderDetail) {
            return res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
        }

        // Trả về thông tin đơn hàng, khách hàng và các sản phẩm trong đơn hàng
        res.json(orderDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).json({ error: error.message });
    }
};