'use strict';

export default (sequelize, DataTypes) => {
  const walletHistory = sequelize.define('walletHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    walletId: DataTypes.UUID,
    refundDate: DataTypes.DATE,
    value: DataTypes.STRING,
    isAddress: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  walletHistory.associate = (db) => {
    walletHistory.belongsTo(db.wallet, {
      foreignKey: 'walletId',
      constraints: false
    })
  }
  return walletHistory;
};