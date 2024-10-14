'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tokens', 'refreshToken', {
      type: Sequelize.TEXT('medium'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tokens', 'refreshToken');
  }
};
