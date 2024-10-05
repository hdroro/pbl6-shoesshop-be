'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const receiptNote = sequelize.define('receiptNote', {
    id: DataTypes.UUID,
    importDate: DataTypes.DATE,
    staffId: DataTypes.STRING
  });
  receiptNote.associate = (db) => {
    receiptNote.belongsToMany(db.productAttribute, {
      through: db.receiptNoteItem,
      foreignKey: 'receiptNoteId',
      constraints: false
    })
  }
  return receiptNote;
};