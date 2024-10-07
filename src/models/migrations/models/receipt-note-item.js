'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  const receiptNoteItem = sequelize.define('receiptNoteItem', {
    id: DataTypes.UUID,
    receiptNoteId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    importPrice: DataTypes.STRING
  });
  receiptNoteItem.associate = (db) => {
    receiptNoteItem.belongsTo(db.receiptNote, {
      foreignKey: 'receiptNoteId',
      constraints: false
    });
    receiptNoteItem.belongsTo(db.productAttribute, {
      foreignKey: 'productAttributeId',
      constraints: false
    });
  }
  return receipt - note - item;
};