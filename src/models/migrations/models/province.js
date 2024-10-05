'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const province = sequelize.define('province', {
    id: DataTypes.UUID,
    name: DataTypes.STRING
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