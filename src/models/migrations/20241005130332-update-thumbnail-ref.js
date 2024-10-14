'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('thumbnails', 'productAttributeId', { transaction });
      
      await queryInterface.addColumn('thumbnails', 'productId', {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'id'
        }
      }, { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn('thumbnails', 'productAttributeId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'product_attributes',
          key: 'id'
        }
      }, { transaction });

      await queryInterface.removeColumn('thumbnails', 'productId', { transaction });
    });
  }
};
