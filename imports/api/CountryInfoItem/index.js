import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'country_info_items';

const CountryInfoItem = sequelize.define(tableName, {

  sectionId: {
    type: DataType.INTEGER(),
  },
  countryCode: {
    type: DataType.CHAR(2),
  },
  userId: {
    type: DataType.INTEGER(),
  },
  imageId: {
    type: DataType.CHAR(255),
    optional: true,
  },
  content: {
    type: DataType.TEXT('long'),
  },

});

export default CountryInfoItem;
