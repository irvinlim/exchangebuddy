import User from '.';
const jwt = require('jsonwebtoken');

// Helpers
import UserHelper from '../../util/user';

if (Meteor.isServer) {
  Meteor.methods({

    getUser(id) {
      check(id, Number);

      return User.findOne({
        where: { id }
      }).then(function(result) {
        return result && result.get();
      });
    },

    updateProfile(values) {
      check(values, Object);

      const { id, displayName } = values;
      check(id, Number);
      check(displayName, String);

      return User.update({ displayName }, { where: { id } });
    },

    verifyToken(token) {
      check(token, String);

      try {
        return jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);
      } catch (exc) {
        throw new Meteor.Error("verifyTokenException", exc);
      }
    },

    loginFacebook(response) {
      check(response, Object);

      if (!response || !response.userID)
        throw new Meteor.Error("loginFacebook.invalidResponse", "Invalid response from Facebook.");

      // Get response data and upsert user information.
      // Return true to continue to set session variable.
      return User.findOne({
        where: { fbUserId: response.userID }
      }).then(function(result) {
        const values = {
          fbUserId: response.userID,
          fbToken: response.accessToken,
          email: response.email,
          displayName: response.name,
          gender: UserHelper.resolveGender(response.gender),
        };

        // Don't use Sequelize.upsert as it results in AUTO_INCREMENT increasing unnecessarily.

        if (result)
          return User.update(values, { where: { fbUserId: response.userID } });
        else
          return User.create(values);
      }).then(function(result) {
        return User.findOne({
          where: { fbUserId: response.userID }
        });
      }).then(function(result) {
        const user = result && result.get();

        if (!user)
          throw new Meteor.Error("loginFacebook.invalidUser", "Could not fetch authenticated user.");

        return {
          user: user,
          token: jwt.sign(user, Meteor.settings.private.jsonWebTokenSecret, {
            expiresIn: "14d"
          })
        };
      }).catch(function(errors) {
        throw new Meteor.Error("loginFacebook.sequelizeError", `Internal Sequelize error: ${errors}`);
      });
    },

  });
}
