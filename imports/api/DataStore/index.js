import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'data_store';

const DataStore = sequelize.define(tableName, {

  dataKey: {
    type: DataType.STRING(255),
    primaryKey: true,
  },
  dataValue: {
    type: DataType.TEXT('long'),
  },

});

export default DataStore;
