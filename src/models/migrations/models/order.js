'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    id: DataTypes.UUID,
    userId: DataTypes.STRING,
    addressId: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    currentStatus: DataTypes.ENUM,
    priceTotal: DataTypes.STRING,
    finalPrice: DataTypes.STRING,
    voucherId: DataTypes.STRING,
    walletMoneyUsed: DataTypes.STRING
  });
  order.associate = (db) => {
    order.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    });
    order.hasMany(db.orderItem, {
      foreignKey: 'orderId',
      constraints: false
    });
    order.hasOne(db.addressId, {
      foreignKey: 'addressId',
      constraints: false
    });
    order.hasMany(db.orderStatusHistory, {
      foreignKey: 'orderId',
      constraints: false
    });
  }
  return order;
};