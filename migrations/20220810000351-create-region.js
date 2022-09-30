'use strict';

const { timeStamp } = require("console");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Regions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timeStamp: true
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timeStamp: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Regions');
  }
};