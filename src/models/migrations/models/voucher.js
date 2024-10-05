'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const voucher = sequelize.define('voucher', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    numberOfVouchers: DataTypes.INTEGER,
    voucherType: DataTypes.ENUM,
    minOrderTotal: DataTypes.STRING,
    discountValue: DataTypes.STRING
  });
  voucher.associate = (db) => {
    voucher.belongsToMany(db.user, {
      through: db.userVoucher,
      foreignKey: 'voucherId',
      constraints: false
    })
  }
  return voucher;
};