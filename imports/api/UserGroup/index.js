import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'user_groups';

const UserGroup = sequelize.define(tableName, {

  // Column definitions here

}, {
  timestamps: false
});

export default UserGroup;
