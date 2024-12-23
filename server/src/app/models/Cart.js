// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db');

// const Cart = sequelize.define('Cart', {
//     CartId: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     UserId: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // Null nếu không yêu cầu đăng nhập
//     },
//     ProductId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     Quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 1,
//     },
// }, {
//     // Thêm thuộc tính ảo cho ProductName
//     getterMethods: {
//         ProductName() {
//             // Lấy ProductName từ liên kết với Product model
//             return this.Product ? this.Product.ProductName : null;
//         },
//     },
// });

// module.exports = Cart;