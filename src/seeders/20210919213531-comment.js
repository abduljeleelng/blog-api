'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Comments', [{
      text: 'comments by seeder',
      postId:1,
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
