'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'username');
    await queryInterface.removeColumn('requests', 'username');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('requests', 'username', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};