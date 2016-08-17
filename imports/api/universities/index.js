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
