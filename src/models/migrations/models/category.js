'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });
  category.associate = (db) => {
    category.hasMany(db.product, {
      foreignKey: 'categoryId',
      constraints: false
    });
  }
  return category;
};