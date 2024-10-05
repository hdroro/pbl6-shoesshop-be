'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order-items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      orderId: {
        type: Sequelize.STRING,
        references: {
          model: 'orders',
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
      sellingPrice: {
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
    await queryInterface.dropTable('order-items');
  }
};