'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        "firstName" : "admin",
        "lastname" : "admin",
        "email" : "admin@admin.com",
        "password" : "$2b$10$QUzt6YJnW4rn5z1kk753V.wwLUfDbVO8UvbDwUcr5UM7aQrPfBhba",
        "profile":  "Admin",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName" : "alex",
        "lastname" : "fox",
        "email" : "afox@ware.com",
        "password" : "$2b$10$QUzt6YJnW4rn5z1kk753V.wwLUfDbVO8UvbDwUcr5UM7aQrPfBhba",
        "profile" : "User",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName" : "jane",
        "lastname" : "fox",
        "email" : "jfox@ware.com",
        "password" : "$2b$10$QUzt6YJnW4rn5z1kk753V.wwLUfDbVO8UvbDwUcr5UM7aQrPfBhba",
        "profile" : "User",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "firstName" : "roxy",
        "lastname" : "fox",
        "email" : "rfox@ware.com",
        "password" : "$2b$10$QUzt6YJnW4rn5z1kk753V.wwLUfDbVO8UvbDwUcr5UM7aQrPfBhba",
        "profile" : "User",
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
    await queryInterface.bulkDelete('users', null, {});
  }
};
