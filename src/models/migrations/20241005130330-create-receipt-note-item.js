'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receipt_note_items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      receiptNoteId: {
        type: Sequelize.UUID,
        references: {
          model: 'receipt_notes',
          key: 'id'
        }
      },
      productAttributeId: {
        type: Sequelize.UUID,
        references: {
          model: 'product_attributes',
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
    await queryInterface.dropTable('receipt_note_items');
  }
};