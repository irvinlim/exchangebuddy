import GroupChatMessage from '.';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

// Only logged in users can insert comments.
export const addMessage = new ValidatedMethod({
  name: 'groupChatMessage.addMessage',
  validate: new SimpleSchema({
    userId: { type: Number },
    userToken: { type: String },
    groupId: { type: Number },
    userId: { type: Number },
    content: { type: String },
  }).validator(),
  run({ userToken, groupId, userId, content }) {
    Meteor.call('getGroup', groupId, (err, group) => {
      Meteor.call('verifyToken', userToken, (err, decodedToken) => {
        console.log(decodedToken);

        if (!this.userId)
          throw new Meteor.Error("groupChatMessage.addMessage.notLoggedIn", "Must be logged in to insert comment.");
        else if (this.userId != userId)
          throw new Meteor.Error("groupChatMessage.addMessage.notAuthenticated", "User ID does not match.");
        else if (!group)
          throw new Meteor.Error("groupChatMessage.addMessage.undefinedGroup", "No such Group found.");

        // Insert comment
        GroupChatMessage.insert({ groupId, userId, content });
      });
    });
  },
});

// Only message author and mods/admins can edit messages.
export const editMessage = new ValidatedMethod({
  name: 'groupChatMessage.edit',
  validate: new SimpleSchema({
    userToken: { type: String },
    _id: { type: String },
    userId: { type: String },
    content: { type: String }
  }).validator(),
  run({ _id, userId, content }) {
    // Get comment
    const comment = GroupChatMessage.findOne(_id);

    if (!comment)
      throw new Meteor.Error("groupChatMessage.editMessage.undefinedComment", "No such comment found.");

    // Check authorized
    const isAuthorized = Roles.userIsInRole(this.userId, ['moderator', 'admin']) || userId == comment.userId;

    if (!this.userId || this.userId != userId)
      throw new Meteor.Error("groupChatMessage.editMessage.notLoggedIn", "Must be logged in to edit comment.");
    else if (!isAuthorized)
      throw new Meteor.Error("groupChatMessage.editMessage.notAuthorized", "Not authorized to edit comment.");

    // Update comment
    GroupChatMessage.update(_id, { $set: { content } });
  },
});

// Only comment author and mods/admins can remove comments.
export const removeMessage = new ValidatedMethod({
  name: 'groupChatMessage.remove',
  validate: new SimpleSchema({
    userToken: { type: String },
    _id: { type: String },
    userId: { type: String },
  }).validator(),
  run({ _id, userId }) {
    // Get comment
    const comment = GroupChatMessage.findOne(_id);

    if (!comment)
      throw new Meteor.Error("groupChatMessage.removeMessage.undefinedComment", "No such comment found.");

    // Check authorized
    const isAuthorized = Roles.userIsInRole(this.userId, ['moderator', 'admin']) || userId == comment.userId;

    if (!this.userId || this.userId != userId)
      throw new Meteor.Error("groupChatMessage.removeMessage.notLoggedIn", "Must be logged in to remove comment.");
    else if (!isAuthorized)
      throw new Meteor.Error("groupChatMessage.removeMessage.notAuthorized", "Not authorized to remove comment.");

    // Update comment
    GroupChatMessage.update(_id, { $set: { isRemoved: true, removeUserId: userId } });
  },
});
