'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const userVoucher = sequelize.define('userVoucher', {
    id: DataTypes.UUID,
    userId: DataTypes.STRING,
    voucherId: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  });
  userVoucher.associate = (db) => {
    userVoucher.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    });
    userVoucher.belongsTo(db.voucher, {
      foreignKey: 'voucherId',
      constraints: false
    });
  }
  return userVoucher;
};