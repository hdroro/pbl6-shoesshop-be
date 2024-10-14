'use strict';

export default (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    target: DataTypes.TINYINT,
    categoryId: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  product.associate = (db) => {
    product.hasMany(db.productAttribute, {
      foreignKey: 'productId',
      constraints: false
    });
    product.hasMany(db.thumbnail, {
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