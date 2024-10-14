'use strict';

export default (sequelize, DataTypes) => {
  const address = sequelize.define('address', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    communeId: DataTypes.INTEGER,
    addressDetail: DataTypes.STRING,
    phoneNumberOrder: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  address.associate = (db) => {
    address.belongsTo(db.order, {
      foreignKey: 'orderId',
      constraints: false
    });
  }
  return address;
};