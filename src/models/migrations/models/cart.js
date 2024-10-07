'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    id: DataTypes.UUID,
    userId: DataTypes.STRING,
    total: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });
  cart.associate = (db) => {
    cart.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    });
    cart.hasMany(db.cartItem, {
      foreignKey: 'cartItem',
      constraints: false
    })
  }
  return cart;
};