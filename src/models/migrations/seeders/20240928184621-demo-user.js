'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 'a79154fe-4fb0-4699-8118-8845283c0045',
      username: 'hdroro',
      firstName: 'Diem',
      lastName: 'Nguyen Hong',
      avatarLink: '',
      email: 'hongdiem@gmail.com',
      password: '$2y$10$JoUk3CksW9J.b6OOBF21PeN8JyeIh/fNxTM5qwHBc/0qu/DnNHXDu', //hongdiem@123
      phoneNumber: '0353905691',
      gender: false,
      roleId: 'bde663b0-ef37-4c1d-9c73-6326b566446d',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2df63061-a0b1-4d4d-a05f-77f6216371d7',
      username: 'harah',
      firstName: 'Ha',
      lastName: 'Nguyen Phuong',
      avatarLink: '',
      email: 'phuongha@gmail.com',
      password: '$2y$10$NVdVT5fdzPLiHpUK9c95geYV3L51IzrgnRuDIoHus.TalwidmFfzW', //phuongha@123
      phoneNumber: '0353905692',
      gender: false,
      roleId: 'aa4189ac-bb79-46ae-ae31-7584cccda3b4',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '1521e47b-69d9-4fc7-8502-6317acb132ac',
      username: 'yanni',
      firstName: 'Nhi',
      lastName: 'Le Nhi',
      avatarLink: '',
      email: 'yanni@gmail.com',
      password: '$2y$10$oivvL6JAp42cZudm5ztqQOHMM0cAfYX910GnMwE404svhM7Z4gvEu', //yanni@123
      phoneNumber: '0353903691',
      gender: false,
      roleId: '34f65737-9912-4926-8fb0-e096acf4172c',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
