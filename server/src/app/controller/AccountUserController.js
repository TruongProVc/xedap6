const Account = require('../models/Account');
const Customer =require('../models/Customer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'saddasdasadsasdadsas'; 
const bcrypt = require('bcrypt');

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
// exports.getOrdersUser = async (req, res) => {
//     const userId = req.user.userId;  // Lấy userId từ token đã xác thực
    
//     try {
//       // Lấy thông tin khách hàng dựa trên userId
//       const customer = await Customer.findOne({ where: { AccountId: userId } });
  
//       if (!customer) {
//         return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
//       }
  
//       // Lấy tất cả đơn hàng của khách hàng theo CustomerId
//       const orders = await Order.findAll({
//         where: { CustomerId: customer.customerid },
//         order: [['CreateAt', 'DESC']], // Sắp xếp theo thời gian tạo đơn hàng mới nhất
//       });
  
//       if (!orders || orders.length === 0) {
//         return res.status(404).json({ message: 'Không có đơn hàng nào được tìm thấy' });
//       }
  
//       // Optional: Lấy chi tiết đơn hàng nếu cần (nếu bạn muốn trả chi tiết sản phẩm trong đơn hàng)
//       for (const order of orders) {
//         const orderDetails = await OrderDetail.findAll({
//           where: { OrderId: order.OrderId },
//         });
//         order.dataValues.OrderDetails = orderDetails;  // Thêm chi tiết đơn hàng vào response
//       }
  
//       res.json({
//         message: 'Danh sách đơn hàng của bạn',
//         orders: orders,  // Trả lại danh sách đơn hàng với chi tiết nếu cần
//       });
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ error: error.message });
//     }
//   };