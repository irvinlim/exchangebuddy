import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'groups';

const Group = sequelize.define(tableName, {

  universityId: {
    type: DataType.INTEGER(),
  },

  year: {
    type: DataType.INTEGER(4),
  },

  term: {
    type: DataType.TEXT(),
  },

});

export default Group;
