import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'universities';

const University = sequelize.define(tableName, {

  name: {
    type: DataType.TEXT(),
  },
  city: {
    type: DataType.TEXT(),
  },

  // Retrievable from topuniversities.com
  countryCode: {
    type: DataType.CHAR(2),
  },
  logoUrl: {
    type: DataType.TEXT(),
  },
  linkUrl: {
    type: DataType.TEXT(),
  },

  // Optional url for logo, to be entered by users/admins
  largeLogoUrl: {
    type: DataType.TEXT(),
  },

  // JSON.stringify()-ed strings
  emailDomains: {
    type: DataType.TEXT(),
  },
  terms: {
    type: DataType.TEXT(),
  },

  // Refers to the cid field when retrieving from topuniversities.com
  topUnisId: {
    type: DataType.INTEGER(),
    unique: true,
  },

  city: {
    type: DataType.TEXT(),
  },

  logoImageId: {
    type: DataType.STRING(255),
  },

  emailDomains: {
    type: DataType.TEXT(),
  },

  terms: {
    type: DataType.TEXT(),
  },

  countryId: {
    type: DataType.INTEGER(),
  },

});

export default University;
