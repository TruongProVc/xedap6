const { DataTypes } = require('sequelize');
const Account = require('../models/Account')
const Product = require('../models/Product')

const sequelize = require('../../config/db');

const Comment = sequelize.define('Comment', {
  CommentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AccountId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'comments',
  timestamps: true, 
});

Comment.belongsTo(Account, { foreignKey: 'AccountId' });
Account.hasMany(Comment, { foreignKey: 'AccountId' });

Comment.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(Comment, { foreignKey: 'ProductId' });


module.exports =  Comment ;
