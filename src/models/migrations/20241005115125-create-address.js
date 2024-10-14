'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      provinceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'provinces',
          key: 'id'
        }
      },
      districtId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'districts',
          key: 'id'
        }
      },
      communeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'communes',
          key: 'id'
        }
      },
      addressDetail: {
        type: Sequelize.STRING
      },
      phoneNumberOrder: {
        type: Sequelize.STRING
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};