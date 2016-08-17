import sequelize from './sequelize';

import User from './users';
import './users/methods';

import University from './universities';
import Country from './countries';

User.belongsTo(University, {
  foreignKey: 'homeUniId',
  as: 'homeUni',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsTo(Country, {
  foreignKey: 'homeCountryCode',
  as: 'homeCountry',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, University, Country };
