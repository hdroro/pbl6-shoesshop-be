'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const address = sequelize.define('address', {
    id: DataTypes.UUID,
    userId: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    communeId: DataTypes.INTEGER,
    addressDetail: DataTypes.STRING,
    phoneNumberOrder: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  });
  address.associate = (db) => {
    address.belongsTo(db.order, {
      foreignKey: 'orderId',
      constraints: false
    });
  }
  return address;
};