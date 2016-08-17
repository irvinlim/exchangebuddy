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

    verifyToken(token) {
      check(token, String);

      try {
        const token = jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);
        return token;
      } catch (exc) {
        throw new Meteor.Error("verifyTokenException", exc);
        return null;
      }
    },

    loginFacebook(response) {
      check(response, Object);

      if (!response || !response.userID)
        throw new Meteor.Error("loginFacebook.invalidResponse", "Invalid response from Facebook.");

      // Get response data and upsert user information.
      // Return true to continue to set session variable.
      return User.upsert({
        fbUserId: response.userID,
        fbToken: response.accessToken,
        email: response.email,
        displayName: response.name,
        gender: UserHelper.resolveGender(response.gender),
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
