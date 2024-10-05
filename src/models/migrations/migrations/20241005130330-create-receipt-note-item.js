'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receipt-note-items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      receiptNoteId: {
        type: Sequelize.STRING,
        references: {
          model: 'receipt-notes',
          key: 'id'
        }
      },
      productAttributeId: {
        type: Sequelize.STRING,
        references: {
          model: 'product-attributes',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      importPrice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('receipt-note-items');
  }
};