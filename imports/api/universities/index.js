import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'universities';

const University = sequelize.define(tableName, {

  name: {
    type: DataType.TEXT(),
  },

});

export default University;
