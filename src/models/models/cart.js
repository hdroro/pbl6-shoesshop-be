'use strict';

export default (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.STRING,
    total: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  cart.associate = (db) => {
    cart.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    });
    cart.hasMany(db.cartItem, {
      foreignKey: 'cartItem',
      constraints: false
    })
  }
  return cart;
};