import { Meteor } from 'meteor/meteor';
import GroupChatMessage from '.';
import Group from '../../api/Group';
import User from '../../api/User';

import { verifyToken } from '../../api/User/methods';

if (Meteor.isServer) {

  Meteor.methods({

    'groupChat.addMessage': function(values) {
      check(values, Object);

      const { userId, userToken, groupId, content } = values;
      check(userId, Number);
      check(userToken, String);
      check(groupId, Number);
      check(content, String);

      const mongoAction = Meteor.bindEnvironment(() => GroupChatMessage.insert({ groupId, userId, content }));

      return Group.findById(groupId).then(function(result) {
        const group = result.get();
        const user = verifyToken(userToken);

        if (!group || group.isRemoved)
          throw new Meteor.Error("groupChat.addMessage.undefinedGroup", "No such Group.");
        else if (!user || user.id != userId)
          throw new Meteor.Error("groupChat.addMessage.notAuthenticated", "User token is not authenticated.");

        return User.findById(userId);
      }).then(function(user) {
        return user.getGroups();
      }).then(function(userGroups) {
        const userIsInGroup = userGroups.some(group => group.get().id === groupId);
        if (!userIsInGroup)
          throw new Meteor.Error("groupChat.addMessage.notAuthorized", "You are not authorized.");

        // Finally run Mongo action
        return mongoAction();
      });
    },

  });
}
