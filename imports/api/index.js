import sequelize from './sequelize';

import User from './users';
import './users/methods';

import University from './universities';

User.belongsTo(University, {
  foreignKey: 'homeUniId',
  as: 'homeUni',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, University };
