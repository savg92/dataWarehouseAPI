'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('countries', [
      {
        "name" : "Argentina",
        regionId: 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Brasil",
        regionId: 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Colombia",
        regionId: 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Uruguay",
        regionId: 1,
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
    await queryInterface.bulkDelete('countries', null, {});
  }
};
