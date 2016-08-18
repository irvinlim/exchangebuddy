import sequelize from './sequelize';

import User from './users';
import './users/methods';

import University from './universities';
import Country from './countries';
import Group from './groups';
import GroupChatMessage from './group_chat_messages';

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
