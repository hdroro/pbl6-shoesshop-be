'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.createTable('users', {
            id: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4
            },
            username: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            firstName: {
              type: Sequelize.STRING
            },
            lastName: {
              type: Sequelize.STRING
            },
            avatarLink: {
              type: Sequelize.STRING
            },
            email: {
              type: Sequelize.STRING,
              allowNull: false
            },
            password: {
              type: Sequelize.STRING,
              allowNull: false
            },
            phoneNumber: {
              type: Sequelize.STRING
            },
            gender: {
              type: Sequelize.BOOLEAN
            },
            roleId: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: 'roles',
                key: 'id'
              }
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
        { transaction },);
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};