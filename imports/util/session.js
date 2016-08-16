import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const setUserSession = (userId, token) => {
  Session.setPersistent("currentUserToken", token);
  Session.setPersistent("currentUserId", userId);
};

export const setCurrentUser = (callback) => {
  verifyCurrentUser((error, user) => {
    if (error || !user)
      return callback(false);

    // Set to Meteor variable
    Meteor.user = () => user;
    Meteor.userId = () => user.id;

    // Continue with the rest of loading
    return callback(true);
  });
};

export const verifyCurrentUser = (callback) => {
  const sessionUserId = Session.get("currentUserId");
  const sessionUserToken = Session.get("currentUserToken");

  if (!sessionUserId || !sessionUserToken)
    return callback(null, null);

  Meteor.call('getUser', sessionUserId, (error, user) => {
    if (error)
      return callback(error, null);
    else if (!user)
      return callback(null, null);

    Meteor.call('verifyToken', sessionUserToken, (error, verified) => {
      if (error)
        return callback(error, null);
      else if (!verified)
        return callback(null, null);
      else
        return callback(null, user);
    });
  });
};
