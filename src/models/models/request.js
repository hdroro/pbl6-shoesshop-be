'use strict';

export default (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID
    },
    status: {
        type: DataTypes.STRING,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  request.associate = (db) => {
    request.belongsTo(db.user, {
        foreignKey: 'userId',
        constraints: false
    });
  };
  return request;
};