'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contacts', [
      {
        "firstName": "John",
        "lastName": 'Doe',
        "jobTitle": 'Software Engineer',
        "email": 'jdoe@ware.com',
        "companyId": 1,
        "cityId": 1,
        "interest": 25,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName": "Jane",
        "lastName": "Fonda",
        "jobTitle": "Actress",
        "email": 'jfonda@ware.com',
        "companyId": 2,
        "cityId": 2,
        "interest": 50,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName": "Dwayne",
        "lastName": "Johnson",
        "jobTitle": "Actor",
        "email": 'djoh@ware.com',
        "companyId": 3,
        "cityId": 3,
        "interest": 75,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName": "Tom",
        "lastName": "Astley",
        "jobTitle": "Singer",
        "email": 'tast@ware.com',
        "companyId": 4,
        "cityId": 4,
        "interest": 100,
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
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
