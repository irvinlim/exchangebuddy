import { Meteor } from 'meteor/meteor';

// Mailgun
process.env.MAIL_URL = Meteor.settings.private.Mailgun.mailUrl;
