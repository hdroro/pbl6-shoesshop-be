'use strict';

export default (sequelize, DataTypes) => {
  const fluctuationPriceHistory = sequelize.define('fluctuationPriceHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    productAttributeId: DataTypes.STRING,
    originPrice: DataTypes.STRING,
    sellingPrice: DataTypes.STRING,
    changeDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'fluctuation_price_histories',
    freezeTableName: true,
  });
  fluctuationPriceHistory.associate = (db) => {
    fluctuationPriceHistory.belongsTo(db.productAttribute, {
      foreignKey: 'productAttributeId',
      constraints: false
    })
  }
  return fluctuationPriceHistory;
};