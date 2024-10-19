'use strict';

export default (sequelize, DataTypes) => {
  const orderItem = sequelize.define('orderItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    sellingPrice: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'order_items',
    freezeTableName: true,
  });
  orderItem.associate = (db) => {
    orderItem.belongsTo(db.order, {
      foreignKey: 'orderId',
      constraints: false
    });
    orderItem.belongsTo(db.productAttribute, {
      foreignKey: 'productAttributeId',
      constraints: false
    });
  }
  return orderItem;
};