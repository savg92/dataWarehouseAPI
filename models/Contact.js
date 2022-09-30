'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.hasMany(models.ContactChannel, {foreignKey: "contactId"});
      Contact.belongsTo(models.Company, {foreignKey: "companyId"});
      Contact.belongsTo(models.City, {foreignKey: "cityId"});
    }
  }
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    email: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    interest: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};