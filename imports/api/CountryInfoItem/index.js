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
  content: {
    type: DataType.TEXT('long'),
  },
  userId: {
    type: DataType.INTEGER(),
  },

});

export default CountryInfoItem;
