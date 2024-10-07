'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const productAttribute = sequelize.define('productAttribute', {
    id: DataTypes.UUID,
    productId: DataTypes.STRING,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });
  productAttribute.associate = (db) => {
    productAttribute.belongsTo(db.product, {
      foreignKey: 'productId',
      constraints: false
    });
    productAttribute.hasMany(db.thumbnail, {
      foreignKey: 'productAttributeId',
      constraints: false
    });
    productAttribute.hasMany(db.fluctuationPriceHistory, {
      foreignKey: 'productAttributeId',
      constraints: false
    });
  }
  return productAttribute;
};