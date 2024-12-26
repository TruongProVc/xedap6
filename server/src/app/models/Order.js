const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Order = sequelize.define('Order', {
    OrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'customer', // Bảng customer
            key: 'CustomerId',
        },
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

module.exports = Order;