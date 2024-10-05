'use strict';

module.exports = (sequelize, DataTypes) => {
  const commune = sequelize.define('commune', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    districtId: DataTypes.INTEGER
  });
  commune.associate = (db) => {
    commune.belongsTo(db.district, {
      foreignKey: 'districtId',
      constraints: false
    });
  }
  return commune;
};