'use strict';

export default (sequelize, DataTypes) => {
  const cartItem = sequelize.define('cartItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cartId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  cartItem.associate = (db) => {
    cartItem.belongsTo(db.cart, {
      foreignKey: 'cartId',
      constraints: false
    })
  }
  return cartItem;
};