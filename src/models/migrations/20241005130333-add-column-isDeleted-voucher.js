'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('vouchers', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('vouchers', 'isDeleted');
  }
};
