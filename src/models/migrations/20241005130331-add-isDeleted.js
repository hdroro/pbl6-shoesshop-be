'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('products', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('product_attributes', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'isDeleted');
    await queryInterface.removeColumn('products', 'isDeleted');
    await queryInterface.removeColumn('product_attributes', 'isDeleted');
  }
};
