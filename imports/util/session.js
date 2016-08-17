import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const setUserSession = (user, token) => {
  Session.setPersistent("currentUserToken", token);
  Session.setPersistent("currentUser", user);
};

export const setCurrentUser = (callback = () => {}) => {
  // Let Meteor.user get from session variable
  Meteor.user = () => Session.get("currentUser");
  Meteor.userId = () => Session.get("currentUser") && Session.get("currentUser").id;

  verifyCurrentUser((error, user) => {
    // Clear session variable if we cannot verify the user.
    if (error || !user) {
      Session.setPersistent("currentUser", undefined);
      Session.setPersistent("currentUserToken", undefined);
      return callback(false);
    }

    // Set session variable (in case not already set)
    Session.setPersistent("currentUser", user);

    // Continue with the rest of loading
    return callback(true);
  });
};

export const verifyCurrentUser = (callback) => {
  const sessionUser = Session.get("currentUser");
  const sessionUserToken = Session.get("currentUserToken");

  if (!sessionUser || !sessionUserToken)
    return callback(null, null);

  Meteor.call('getUser', sessionUser.id, (error, user) => {
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
