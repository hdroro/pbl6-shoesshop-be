'use strict';

const { tokenTypes } = require("../../../config/tokens");

module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID
    },
    type: {
        type: DataTypes.ENUM,
        required: true,
        values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
  });
  token.associate = (db) => {
    token.belongsTo(db.user, {
        foreignKey: 'userId',
        constraints: false
    });
  };
  return token;
};