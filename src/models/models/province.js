'use strict';

export default (sequelize, DataTypes) => {
  const province = sequelize.define('province', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  province.associate = (db) => {
    province.hasMany(db.district, {
      foreignKey: 'provinceId',
      constraints: false
    });
    province.hasOne(db.shippingFee, {
      foreignKey: 'provinceId',
      constraints: false
    })
  }
  return province;
};