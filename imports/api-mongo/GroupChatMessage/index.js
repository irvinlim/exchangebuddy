import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const GroupChatMessage = new Mongo.Collection('GroupChatMessage');

EventPostingMessageSchema = new SimpleSchema({
  id: {
    type: String,
    label: 'Facebook Event id',
    optional: true,
  },
  url: {
    type: String,
    label: 'Meetup Event url',
    optional: true,
  },
  yes_rsvp_count: {
    type: Number,
    label: 'Meetup Event yes count',
    optional: true,
  },
  name: {
    type: String,
    label: 'Event title',
    optional: true,
  },
  profilePicture: {
    type: String,
    label: 'Event profile picture',
    optional: true,
  },
  coverPicture: {
    type: String,
    label: 'Event cover picture',
    optional: true,
  },
  startTime: {
    type: Date,
    label: 'Event start Date Time',
    optional: true,
  }
})

GroupChatMessage.schema = new SimpleSchema({
  groupId: {
    type: Number,
    label: 'Group ID in MySQL table'
  },
  type: {
    type: String,
    label: 'Message type - user or event'
  },
  userId: {
    type: Number,
    label: 'Message author userId in MySQL table'
  },
  content: {
    type: String,
    label: 'Message content'
  },
  createdAt: {
    type: Date,
    label: 'Date that message was created',
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    label: 'Date that message was updated',
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true
  },

  isRemoved: {
    type: Boolean,
    label: 'Whether the message has been removed',
    defaultValue: false
  },
  removeUserId: {
    type: Number,
    label: 'Message deleter userId in MySQL table',
    optional: true
  },
  removeDate: {
    type: Date,
    label: 'Date when message was removed',
    optional: true
  },

  eventPosting:{
    type: EventPostingMessageSchema,
    label: 'Event posting',
    optional: true,
  }
});

GroupChatMessage.attachSchema(GroupChatMessage.schema);

export default GroupChatMessage;
