'use strict';

export default (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.STRING,
    addressId: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    currentStatus: DataTypes.STRING,
    priceTotal: DataTypes.STRING,
    finalPrice: DataTypes.STRING,
    voucherId: DataTypes.STRING,
    walletMoneyUsed: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
    order.hasOne(db.address);
    order.hasMany(db.orderStatusHistory, {
      foreignKey: 'orderId',
      constraints: false
    });
  }
  return order;
};