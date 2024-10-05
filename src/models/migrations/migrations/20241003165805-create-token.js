'use strict';

const { tokenTypes } = require('../../../config/tokens');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('tokens', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        type: {
          type: Sequelize.ENUM,
          values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL], 
          allowNull: false,
          defaultValue: tokenTypes.REFRESH
        },
        expires: {
          type: Sequelize.DATE
        },
        blacklisted: {
          type: Sequelize.BOOLEAN
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
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
      });
      { transaction }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  }
};