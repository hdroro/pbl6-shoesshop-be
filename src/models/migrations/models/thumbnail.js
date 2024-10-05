'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const thumbnail = sequelize.define('thumbnail', {
    id: DataTypes.UUID,
    productAttributeId: DataTypes.STRING,
    thumbnail: DataTypes.TEXT
  });
  thumbnail.associate = (db) => {
    thumbnail.belongsTo(db.productAttribute, {
      foreignKey: 'productAttributeId',
      constraints: false
    })
  }
  return thumbnail;
};