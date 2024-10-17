'use strict';

export default (sequelize, DataTypes) => {
  const receiptNoteItem = sequelize.define('receiptNoteItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    receiptNoteId: DataTypes.STRING,
    productAttributeId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    importPrice: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'receipt_note_items',
    freezeTableName: true,
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
  return receiptNoteItem;
};