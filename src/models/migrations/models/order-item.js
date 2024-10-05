'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const orderItem = sequelize.define('orderItem', {
    id: DataTypes.UUID,
    orderId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    sellingPrice: DataTypes.STRING
  });
  orderItem.associate = (db) => {
    orderItem.belongsTo(db.order, {
      foreignKey: 'orderId',
      constraints: false
    })
  }
  return orderItem;
};