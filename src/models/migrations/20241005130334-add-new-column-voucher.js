'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('vouchers', 'minOrderTotal', 'minOrderPrice');
    
    await queryInterface.addColumn('vouchers', 'maxDiscountPrice', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('vouchers', 'minOrderPrice', 'minOrderTotal');
    await queryInterface.removeColumn('vouchers', 'maxDiscountPrice');
  }
};
