'use strict';

export default (sequelize, DataTypes) => {
  const district = sequelize.define('district', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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