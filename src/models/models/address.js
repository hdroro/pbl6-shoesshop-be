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
    address.belongsTo(db.order,{
      foreignKey: 'addressId',
      constraints: false
    });
    address.hasMany(db.province, {
      foreignKey: 'provinceId',
      constraints: false
    });
    address.hasMany(db.district, {
      foreignKey: 'districtId',
      constraints: false
    });
    address.hasMany(db.commune, {
      foreignKey: 'communeId',
      constraints: false
    });
  }
  return address;
};