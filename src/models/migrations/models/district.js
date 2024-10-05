'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const district = sequelize.define('district', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    provinceId: DataTypes.INTEGER
  });
  district.associate = (db) => {
    district.belongsTo(db.province, {
      foreignKey: 'provinceId',
      constraints: false
    });
    district.hasMany(db.commune, {
      foreignKey: 'districtId',
      constraints: false
    })
  }
  return district;
};