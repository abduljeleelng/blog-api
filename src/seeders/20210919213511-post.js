'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Posts', [{
      contents: 'John Doe',
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
