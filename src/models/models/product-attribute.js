'use strict';

export default (sequelize, DataTypes) => {
  const productAttribute = sequelize.define('productAttribute', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: DataTypes.STRING,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'product_attributes',
    freezeTableName: true,
  });
  productAttribute.associate = (db) => {
    productAttribute.belongsTo(db.product, {
      foreignKey: 'productId',
      constraints: false
    });
    productAttribute.hasMany(db.fluctuationPriceHistory, {
      foreignKey: 'productAttributeId',
      constraints: false
    });
  }
  return productAttribute;
};