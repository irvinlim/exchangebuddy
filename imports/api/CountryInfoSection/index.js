import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'country_info_sections';

const CountryInfoSection = sequelize.define(tableName, {

  label: {
    type: DataType.TEXT(),
  },
  contentType: {
    type: DataType.ENUM('number', 'text', 'url', 'markdown'),
    defaultValue: 'markdown',
  },
  editable: {
    type: DataType.BOOLEAN(),
    defaultValue: false,
  },
  defaultImageId: {
    type: DataType.CHAR(255),
    optional: true,
  },

});

export default CountryInfoSection;
