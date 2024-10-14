'use strict';

export default (sequelize, DataTypes) => {
  const orderStatusHistory = sequelize.define('orderStatusHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: DataTypes.STRING,
    changeDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  orderStatusHistory.associate = (db) => {
    orderStatusHistory.belongsTo(db.order, {
      foreignKey: 'orderId',
      constraints: false
    })
  }
  return orderStatusHistory;
};