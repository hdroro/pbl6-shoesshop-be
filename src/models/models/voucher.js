'use strict';

export default (sequelize, DataTypes) => {
  const voucher = sequelize.define('voucher', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    numberOfVouchers: DataTypes.INTEGER,
    voucherType: DataTypes.STRING,
    minOrderTotal: DataTypes.STRING,
    discountValue: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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