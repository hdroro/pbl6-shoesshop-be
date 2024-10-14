'use strict';

export default (sequelize, DataTypes) => {
  const receiptNote = sequelize.define('receiptNote', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    importDate: DataTypes.DATE,
    staffId: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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