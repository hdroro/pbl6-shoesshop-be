'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.UUID
  });
  notification.associate = (db) => {
    notification.belongsTo(db.user, {
      foreignKey: 'userId',
      constraints: false
    })
  }
  return notification;
};