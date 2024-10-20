'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
      addressId: {
        type: Sequelize.UUID,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      orderDate: {
        type: Sequelize.DATE
      },
      currentStatus: {
        type: Sequelize.STRING
      },
      priceTotal: {
        type: Sequelize.STRING
      },
      finalPrice: {
        type: Sequelize.STRING
      },
      voucherId: {
        type: Sequelize.UUID,
        references: {
          model: 'vouchers',
          key: 'id'
        }
      },
      walletMoneyUsed: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('orders');
  }
};