import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'group_chat_messages';

const GroupChatMessage = sequelize.define(tableName, {

  groupId: {
    type: DataType.INTEGER(),
  },

  userId: {
    type: DataType.INTEGER(),
  },

  message: {
    type: DataType.TEXT(),
  },

  isRemoved: {
    type: DataType.BOOLEAN(),
  },

});

export default GroupChatMessage;
