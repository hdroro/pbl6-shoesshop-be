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
  },{
    tableName: 'receipt_notes',
    freezeTableName: true,
  });
  receiptNote.associate = (db) => {
    receiptNote.belongsToMany(db.productAttribute, {
      through: db.receiptNoteItem,
      foreignKey: 'receiptNoteId',
      constraints: false
    });
    receiptNote.belongsTo(db.user, {
      foreignKey: 'staffId',
      constraints: false
    })
  }
  return receiptNote;
};