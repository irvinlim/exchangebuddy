import sequelize from './sequelize';

// Models
import User from './User';
import University from './University';
import Country from './Country';
import Group from './Group';
import GroupChatMessage from './GroupChatMessage';

// Relational tables
import UserGroup from './UserGroup';

// Methods
import './User/methods';
import './Group/methods';

// Publications
import './University/publications';

// Declare foreign keys
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
  as: 'university',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

GroupChatMessage.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'group',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

GroupChatMessage.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, University, Country, Group, GroupChatMessage };
