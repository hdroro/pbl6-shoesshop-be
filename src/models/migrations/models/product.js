'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    target: DataTypes.TINYINT,
    categoryId: DataTypes.STRING
  });
  product.associate = (db) => {
    product.hasMany(db.productAttribute, {
      foreignKey: 'productId',
      constraints: false
    });
    product.belongsTo(db.category, {
      foreignKey: 'categoryId',
      constraints: false
    });
  }
  return product;
};