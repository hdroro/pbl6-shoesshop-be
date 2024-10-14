'use strict';

export default (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    refreshToken: {
      type: DataTypes.TEXT('medium')
    },
    userId: {
        type: DataTypes.UUID
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  token.associate = (db) => {
    token.belongsTo(db.user, {
        foreignKey: 'userId',
        constraints: false
    });
  };
  return token;
};