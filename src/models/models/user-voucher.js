'use strict';

export default (sequelize, DataTypes) => {
  const userVoucher = sequelize.define('userVoucher', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.STRING,
    voucherId: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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