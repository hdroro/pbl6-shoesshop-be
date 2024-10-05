'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const wallet = sequelize.define('wallet', {
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    currentCoins: DataTypes.STRING
  });
  wallet.associate = (db) => {
    wallet.hasMany(db.walletHistory, {
      foreignKey: 'walletId',
      constraints: false
    });
    wallet.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    });
  }
  return wallet;
};