'use strict';

export default (sequelize, DataTypes) => {
  const shippingFee = sequelize.define('shippingFee', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    provinceId: DataTypes.INTEGER,
    shippingFee: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  shippingFee.associate = (db) => {
    shippingFee.belongsTo(db.province, {
      foreignKey: 'provinceId',
      constraints: false
    })
  }
  return shippingFee;
};