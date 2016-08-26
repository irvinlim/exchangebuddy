import sequelize from './sequelize';

// Models
import User from './User';
import University from './University';
import Country from './Country';
import Group from './Group';
import DataStore from './DataStore';
import CountryInfoSection from './CountryInfoSection';
import CountryInfoItem from './CountryInfoItem';
import UniversityInfoSection from './UniversityInfoSection';
import UniversityInfoItem from './UniversityInfoItem';

// Relational tables
import UserGroup from './UserGroup';

// Methods
import './User/methods';
import './University/methods';
import './Country/methods';
import './Group/methods';
import './UserGroup/methods';
import './DataStore/methods';
import './CountryInfoItem/methods';
import './UniversityInfoItem/methods';

// Publications
import './University/publications';

// Declare foreign keys
User.belongsTo(University, {
  foreignKey: 'homeUniId',
  as: 'homeUniversity',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsTo(Country, {
  foreignKey: 'homeCountryCode',
  as: 'homeCountry',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Country.hasMany(User, {
  foreignKey: 'homeCountryCode',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsTo(Group, {
  foreignKey: 'defaultGroupId',
  as: 'defaultGroup',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.belongsToMany(Group, {
  through: UserGroup,
  foreignKey: 'userId'
});

Group.belongsToMany(User, {
  through: UserGroup,
  foreignKey: 'groupId'
});

Group.belongsTo(University, {
  foreignKey: 'universityId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

University.hasMany(Group, {
  foreignKey: 'universityId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

CountryInfoItem.belongsTo(Country, {
  foreignKey: 'countryCode',
  as: 'country',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

CountryInfoItem.belongsTo(CountryInfoSection, {
  foreignKey: 'sectionId',
  as: 'section',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

CountryInfoItem.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UniversityInfoItem.belongsTo(University, {
  foreignKey: 'universityId',
  as: 'university',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UniversityInfoItem.belongsTo(UniversityInfoSection, {
  foreignKey: 'sectionId',
  as: 'section',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UniversityInfoItem.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, University, Country, Group, DataStore, CountryInfoItem, CountryInfoSection, UniversityInfoItem, UniversityInfoSection };
