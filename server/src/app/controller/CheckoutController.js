const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const SECRET_KEY = 'saddasdasadsasdadsas';

// Lấy dữ liệu giỏ hàng và thông tin khách hàng
exports.getCustomerData = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token không được cung cấp" });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user; // Gán thông tin người dùng vào req
        const customer = await Customer.findOne({
            where: { CustomerId: user.customerid },
        });
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng." });
        }
        res.json(customer);
    } catch (err) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }
};  // Đóng ngoặc ở đây

// Xử lý thanh toán và tạo đơn hàng
exports.checkout = async (req, res) => {
  const { cart, paymentMethod, address, mobile, email, firstname, lastname } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: "Token không được cung cấp" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;

    // Lấy thông tin khách hàng từ DB
    const customer = await Customer.findOne({
      where: { CustomerId: user.customerid },
    });

    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng." });
    }

    // Tính tổng tiền giỏ hàng (SubPrice)
    const subPrice = cart.reduce((acc, item) => acc + (item.Price * item.Quantity), 0);
    const discount = 2;  
    const newOrder = await Order.create({
      CustomerId: customer.CustomerId,
      PaymentMethod: paymentMethod,
      Address: address || customer.Address,
      Mobile: mobile || customer.Mobile,
      Email: email || customer.Email,
      Firstname: firstname || customer.Firstname,
      Lastname: lastname || customer.Lastname,
      TotalPrice: subPrice,  // Tổng giá trị của đơn hàng
      SubPrice: subPrice,    // SubPrice là tổng giá trị giỏ hàng
      Discount: discount,    // Discount mặc định = 0
      CreateAt: new Date(),
    });

    // Đảm bảo rằng OrderId đã được tạo
    if (!newOrder.OrderId) {
      return res.status(400).json({ message: "Không thể tạo đơn hàng." });
    }

    // Tạo các chi tiết đơn hàng
    const orderDetails = cart.map(item => ({
      OrderId: newOrder.OrderId,  // Sử dụng OrderId vừa tạo
      ProductId: item.ProductId,
      Quantity: item.Quantity,
    }));

    // Lưu chi tiết đơn hàng
    for(var i = 0;i<orderDetails.length;i++){
      await OrderDetail.create({
        OrderId: orderDetails[i].OrderId,
        ProductId: orderDetails[i].ProductId,
        Quantity: orderDetails[i].Quantity
      });
    }

    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công!",
      orderId: newOrder.OrderId,
      totalAmount: newOrder.TotalPrice,
      orderDate: newOrder.CreateAt,
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
