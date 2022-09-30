'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContactChannels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.STRING
      },
      channelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Channels',
          key: 'id',
          as: 'channelsId'
        }
      },
      contactId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'contactsId'
        }
      },
      preference: {
        allowNull: true,
        defaultValue: "1",
        comment: "0 - no molestar\n1 - sin preferencia\n2 - favorito \n",
        type: Sequelize.ENUM('0', '1', '2')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContactChannels');
  }
};