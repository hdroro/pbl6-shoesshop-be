'use strict';

export default (sequelize, DataTypes) => {
  const commune = sequelize.define('commune', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    districtId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  commune.associate = (db) => {
    commune.belongsTo(db.district, {
      foreignKey: 'districtId',
      constraints: false
    });
    commune.hasOne(db.address, {
      foreignKey: 'communeId',
      constraints: false
    });
  }
  return commune;
};