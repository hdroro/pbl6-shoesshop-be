'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
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