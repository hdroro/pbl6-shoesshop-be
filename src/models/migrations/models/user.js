'use strict';
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarLink: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      }
  });
  user.associate = (db) => {
    user.belongsTo(db.role, {
      foreignKey: 'roleId',
      constraints: false
    });
    user.hasMany(db.token, {
      foreignKey: 'userId',
      constraints: false
    });
    user.hasMany(db.notification, {
      foreignKey: 'userId',
      constraints: false
    });
    user.hasMany(db.order, {
      foreignKey: 'userId',
      constraints: false
    });
    user.hasOne(db.wallet, {
      foreignKey: 'userId',
      constraints: false
    });
  }
  return user;
};