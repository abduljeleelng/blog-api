'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Comments', [{
      text: 'John Doe',
      //post_id:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
