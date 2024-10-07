'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const fluctuationPriceHistory = sequelize.define('fluctuationPriceHistory', {
    id: DataTypes.UUID,
    productAttributeId: DataTypes.STRING,
    originPrice: DataTypes.STRING,
    sellingPrice: DataTypes.STRING,
    changeDate: DataTypes.DATE
  });
  fluctuationPriceHistory.associate = (db) => {
    fluctuationPriceHistory.belongsTo(db.productAttribute, {
      foreignKey: 'productAttributeId',
      constraints: false
    })
  }
  return fluctuationPriceHistory;
};