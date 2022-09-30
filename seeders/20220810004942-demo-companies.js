'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companies', [
      {
        "name" : "Argentina S.A.",
        address: "Av. Paseo de la República, 1",
        email: "arg@ware.com",
        phone: "55-55-55-55",
        cityId: 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Brasil S.A.",
        address: "Rua do Brasil, 1",
        email: "bra@ware.com",
        phone: "55-55-55-55",
        cityId: 2,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Colombia S.A.",
        address: "Calle de la Colombia, 1",
        email: "col@ware.com",
        phone: "55-55-55-55",
        cityId: 3,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        "name" : "Uruguay S.A.",
        address: "Calle de la Uruguay, 1",
        email: "uru@ware.com",
        phone: "55-55-55-55",
        cityId: 4,
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
    await queryInterface.bulkDelete('companies', null, {});
  }
};
