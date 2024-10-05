'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const walletHistory = sequelize.define('walletHistory', {
    id: DataTypes.UUID,
    walletId: DataTypes.UUID,
    refundDate: DataTypes.DATE,
    value: DataTypes.STRING,
    isAddress: DataTypes.BOOLEAN
  });
  walletHistory.associate = (db) => {
    walletHistory.belongsTo('wallet', {
      foreignKey: 'walletId',
      constraints: false
    })
  }
  return walletHistory;
};