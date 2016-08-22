import { Meteor } from 'meteor/meteor';
import GroupChatMessage from '..';

Meteor.publish('messages-for-group', function(groupId) {
  check(groupId, Match._id);

  const group = Meteor.call('getGroup', groupId);

  // Don't publish messages for removed groups
  if (!group || group.isRemoved)
    return this.ready();

  const selector = {
    groupId,
    isRemoved: { $ne: true },
  };

  // Publish all comments for this giveaway that are not removed.
  return GroupChatMessage.find(selector);
});
