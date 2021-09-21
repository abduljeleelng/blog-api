'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'John Doe',
      lastName: 'Ola',
      email: 'abduljelelng@gmail.com',
      password: 'adminOla',
      salt:'00388883',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
