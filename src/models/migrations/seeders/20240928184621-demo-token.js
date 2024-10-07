'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      id: 'bde663b0-ef37-4c1d-9c73-6326b566446d',
      roleName: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'aa4189ac-bb79-46ae-ae31-7584cccda3b4',
      roleName: 'staff',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '34f65737-9912-4926-8fb0-e096acf4172c',
      roleName: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
