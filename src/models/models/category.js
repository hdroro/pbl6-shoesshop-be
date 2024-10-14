'use strict';

export default (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  category.associate = (db) => {
    category.hasMany(db.product, {
      foreignKey: 'categoryId',
      constraints: false
    });
  }
  return category;
};