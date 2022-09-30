'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('channels', [
      {
        "name" : "Phone",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Email",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Instagram",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Facebook",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('channels', null, {});
  }
};
