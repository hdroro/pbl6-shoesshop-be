'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const shippingFee = sequelize.define('shippingFee', {
    id: DataTypes.UUID,
    provinceId: DataTypes.INTEGER,
    shippingFee: DataTypes.FLOAT
  });
  shippingFee.associate = (db) => {
    shippingFee.belongsTo(db.province, {
      foreignKey: 'provinceId',
      constraints: false
    })
  }
  return shippingFee;
};