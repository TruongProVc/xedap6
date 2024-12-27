const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Customer = require('./Customer'); 

const Order = sequelize.define('Order', {
    OrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    PaymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    SubPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    TotalPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CreateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    OrderStatus: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
}, {
    tableName: 'order',
    timestamps: false, 
});

// Khai báo mối quan hệ giữa Order và Customer
Order.belongsTo(Customer, { foreignKey: 'CustomerId' });
Customer.hasOne(Order, { foreignKey: 'CustomerId' });


module.exports = Order;
