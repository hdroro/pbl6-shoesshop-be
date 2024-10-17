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
    appliedDate: {
      type: DataTypes.DATE,
      field: 'startDate'
    },
    expiredDate: {
      type: DataTypes.DATE,
      field: 'endDate'
    },
    numberOfVouchers: DataTypes.INTEGER,
    voucherType: DataTypes.STRING,
    minOrderPrice: DataTypes.STRING,
    maxDiscountPrice: DataTypes.STRING,
    discountValue: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
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