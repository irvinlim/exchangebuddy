import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'countries';

const Country = sequelize.define(tableName, {

  name: {
    type: DataType.TEXT(),
  },

  countryCode2: {
    type: DataType.STRING(2),
  },

  countryCode3: {
    type: DataType.STRING(3),
  },

  flagImageId: {
    type: DataType.STRING(255),
  },

});

export default Country;
