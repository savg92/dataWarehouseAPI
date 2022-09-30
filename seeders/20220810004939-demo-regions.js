'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('regions', [
      {
        "name" : "Sur America",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Norte America",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Eropa",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Asia",
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
    await queryInterface.bulkDelete('regions', null, {});
  }
};
