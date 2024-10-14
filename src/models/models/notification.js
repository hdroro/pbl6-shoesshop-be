'use strict';

export default (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  notification.associate = (db) => {
    notification.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    })
  }
  return notification;
};