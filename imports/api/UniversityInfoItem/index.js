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
  userId: {
    type: DataType.INTEGER(),
  },
  imageId: {
    type: DataType.STRING(255),
    optional: true,
  },
  content: {
    type: DataType.TEXT('long'),
  },

});

export default UniversityInfoItem;
