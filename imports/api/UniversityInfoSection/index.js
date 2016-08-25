import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'university_info_sections';

const UniversityInfoSection = sequelize.define(tableName, {

  label: {
    type: DataType.TEXT(),
  },
  contentType: {
    type: DataType.ENUM('number', 'text', 'url', 'markdown'),
    defaultValue: 'markdown',
  },
  editable: {
    type: DataType.BOOLEAN(),
    defaultValue: true,
  },
  defaultImageId: {
    type: DataType.CHAR(255),
    optional: true,
  },
  defaultContentHeadings: {
    // JSON Array
    type: DataType.TEXT('long'),
    optional: true,
  },
  subtitle: {
    // Shown as a subtitle in the section item page
    // Use $UNIVERSITY to represent the university's name
    type: DataType.TEXT(),
    optional: true,
  },

});

export default UniversityInfoSection;
