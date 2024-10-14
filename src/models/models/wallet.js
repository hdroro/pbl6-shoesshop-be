'use strict';

export default (sequelize, DataTypes) => {
  const wallet = sequelize.define('wallet', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.UUID,
    currentCoins: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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