import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'countries';

const Country = sequelize.define(tableName, {

  // Use this as the primary key to identify countries
  // Has to be uppercase.
  alpha2Code: {
    type: DataType.CHAR(2),
    primaryKey: true,
  },

  // Other fields
  name: {
    type: DataType.TEXT(),
  },
  alpha3Code: {
    type: DataType.CHAR(3),
  },
  region: {
    type: DataType.ENUM('Africa', 'Americas', 'Asia', 'Europe', 'Oceania'),
  },
  lat: {
    type: DataType.DOUBLE(),
  },
  lng: {
    type: DataType.DOUBLE(),
  },

  // Stored as JSON stringified arrays
  altSpellings: {
    type: DataType.TEXT(),
  },
  currencies: {
    type: DataType.TEXT(),
  },
  languages: {
    type: DataType.TEXT(),
  },
  timezones: {
    type: DataType.TEXT(),
  },
  callingCodes: {
    type: DataType.TEXT(),
  },

});

export default Country;
