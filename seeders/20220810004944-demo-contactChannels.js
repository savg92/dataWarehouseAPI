'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ContactChannels', [
      {
        "account": "admin",
        "channelId": 1,
        "contactId": 1,
        "preference": "1",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "account": "asdfdsf",
        "channelId": 2,
        "contactId": 2,
        "preference": "0",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "account": "gfdhdr",
        "channelId": 3,
        "contactId": 3,
        "preference": "2",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "account": "dsfgsd",
        "channelId": 4,
        "contactId": 4,
        "preference": "1",
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
     await queryInterface.bulkDelete('ContactChannels', null, {});
  }
};
