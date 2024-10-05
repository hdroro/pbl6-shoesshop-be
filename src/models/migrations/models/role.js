'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    roleName: DataTypes.STRING,
  });

  role.associate = (db) => {
    role.hasMany(db.user, {
      foreignKey: 'roleId',
      constraints: false
    });
  }
  return role;
};