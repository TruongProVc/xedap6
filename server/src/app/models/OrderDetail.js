const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Order = require('./Order');
const Product = require('./Product');

  const OrderDetail = sequelize.define('OrderDetail', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'orderdetail',
    timestamps: false,
});

OrderDetail.belongsTo(Order, { foreignKey: 'OrderId' });
Order.hasMany(OrderDetail, { foreignKey: 'OrderId' });


OrderDetail.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(OrderDetail, { foreignKey: 'ProductId' });

module.exports = OrderDetail;