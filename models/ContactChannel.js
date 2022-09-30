'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactChannel.belongsTo(models.Channel, {foreignKey: "channelId"});
      ContactChannel.belongsTo(models.Contact, {foreignKey: "contactId"});
    }
  }
  ContactChannel.init({
    account: DataTypes.STRING,
    channelId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    preference: DataTypes.ENUM('0', '1', '2')
  }, {
    sequelize,
    modelName: 'ContactChannel',
  });
  return ContactChannel;
};