'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        "name" : "Buenos Aires",
        "countryId" : 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Brasilia",
        "countryId" : 2,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Bogota",
        "countryId" : 3,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Montevideo",
        "countryId" : 4,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cities', null, {});
  }
};
