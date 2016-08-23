import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'university_info_items';

const UniversityInfoItem = sequelize.define(tableName, {

  sectionId: {
    type: DataType.INTEGER(),
  },
  universityId: {
    type: DataType.INTEGER(),
  },
  content: {
    type: DataType.TEXT('long'),
  },
  userId: {
    type: DataType.INTEGER(),
  },

});

export default UniversityInfoItem;
