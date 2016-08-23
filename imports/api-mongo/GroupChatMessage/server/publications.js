import { Meteor } from 'meteor/meteor';
import GroupChatMessage from '..';
import Group from '../../../api/Group';

Meteor.publish('messages-for-group', function(groupId) {
  const self = this;

  check(groupId, Number);

  Group.findById(groupId).then(Meteor.bindEnvironment((result) => {
    const group = result.get();

    // Don't publish messages for removed groups
    if (!group || group.isRemoved)
      return this.ready();

    const selector = {
      groupId,
      isRemoved: { $ne: true },
    };

    // https://docs.meteor.com/api/pubsub.html#Meteor-publish
    const handle = GroupChatMessage.find(selector).observeChanges({
      added: function (id) {
        self.added("GroupChatMessage", id);
      },
      removed: function (id) {
        self.removed("GroupChatMessage", id);
      }
    });

    // Initiate observeChanges
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
      handle.stop();
    });

  }));
});
