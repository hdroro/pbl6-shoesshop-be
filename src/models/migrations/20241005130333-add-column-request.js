'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('requests', 'username', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('requests', 'firstName', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('requests', 'lastName', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('requests', 'phoneNumber', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('requests', 'dateOfBirth', {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('users', 'dateOfBirth', {
      type: Sequelize.DATE,
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('requests', 'username');
    await queryInterface.removeColumn('requests', 'firstName');
    await queryInterface.removeColumn('requests', 'lastName');
    await queryInterface.removeColumn('requests', 'phoneNumber');
    await queryInterface.removeColumn('requests', 'dateOfBirth');
  }
};
