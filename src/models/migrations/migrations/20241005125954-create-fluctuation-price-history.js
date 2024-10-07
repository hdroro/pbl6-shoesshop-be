'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fluctuation-price-histories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      productAttributeId: {
        type: Sequelize.STRING,
        references: {
          model: 'product-attributes'
        }
      },
      originPrice: {
        type: Sequelize.STRING
      },
      sellingPrice: {
        type: Sequelize.STRING
      },
      changeDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('fluctuation-price-histories');
  }
};