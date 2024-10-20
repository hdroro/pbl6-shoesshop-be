'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 'a79154fe-4fb0-4699-8118-8845283c0045',
      firstName: 'Diem',
      lastName: 'Nguyen Hong',
      avatarLink: '',
      email: 'hongdiem@gmail.com',
      password: '$2y$10$Yt.Sr23ztKnR9mpSDWiTlOVrtUqfHnBL78GzRWWS2aNxAMOyH/po6', //Hongdiem@123
      phoneNumber: '0353905691',
      gender: false,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2df63061-a0b1-4d4d-a05f-77f6216371d7',
      firstName: 'Ha',
      lastName: 'Nguyen Phuong',
      avatarLink: '',
      email: 'phuongha@gmail.com',
      password: '$2y$10$GG1tU1gW604acjiqVox9teUzSWWJnVTwbkz5vP1/6ju9W4bSGsrrm', //Phuongha@123
      phoneNumber: '0353905692',
      gender: false,
      role: 'staff',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '1521e47b-69d9-4fc7-8502-6317acb132ac',
      firstName: 'Nhi',
      lastName: 'Le Nhi',
      avatarLink: '',
      email: 'yanni@gmail.com',
      password: '$2y$10$EEkNLeeVwtAZmMnN2s8Zl.Z28tvzfYM6WUa4Y703QdwbVgVZmP4Oe', //Yanni@123
      phoneNumber: '0353903691',
      gender: false,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
