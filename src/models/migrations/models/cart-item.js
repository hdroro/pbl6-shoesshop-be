'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const cartItem = sequelize.define('cartItem', {
    id: DataTypes.UUID,
    cartId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });
  cartItem.associate = (db) => {
    cartItem.belongsTo(db.cart, {
      foreignKey: 'cartId',
      constraints: false
    })
  }
  return cartItem;
};