'use strict';

export default (sequelize, DataTypes) => {
  const thumbnail = sequelize.define('thumbnail', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    productAttributeId: DataTypes.STRING,
    thumbnail: DataTypes.TEXT,
    isPrimary: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  thumbnail.associate = (db) => {
    thumbnail.belongsTo(db.product, {
      foreignKey: 'productId',
      constraints: false
    })
  }
  return thumbnail;
};