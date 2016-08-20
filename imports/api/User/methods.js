const jwt = require('jsonwebtoken');

// Models
import User from '.';
import University from '../University'

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

      const { id, displayName, gender, homeUniName } = values;
      check(id, Number);
      check(displayName, String);
      check(gender, String);
      check(homeUniName, String);

      return University.findOne({ where: { name: homeUniName } }).then(function(result) {
        const homeUni = result && result.get();
        const homeUniId = homeUni ? homeUni.id : null;

        if (result)
          return User.update({ displayName, gender, homeUniId }, { where: { id } });
      });
    },

    // Verify email

    sendVerificationEmail(values) {
      check(values, Object);

      const { userId, homeUniEmail } = values;
      check(userId, Number);
      check(homeUniEmail, String);

      return User.findOne({
        where: { id: userId }
      }).then(Meteor.bindEnvironment(function(result) {
        const user = result.get();
        const token = jwt.sign({ userId, homeUniEmail }, Meteor.settings.private.jsonWebTokenSecret, { expiresIn: "2d" });
        const verifyUrl = "http://localhost:3000/verify/" + token;

        try {
          Email.send({
            to: homeUniEmail,
            from: "ExchangeBuddy <no-reply@mg.irvinlim.com>",
            subject: "ExchangeBuddy: Please confirm your email",
            html: `<p>Hi ${user.displayName},</p><p>Please click the link below to verify your email address.</p><p><a href="${verifyUrl}">${verifyUrl}</a></p><p>Cheers,<br />ExchangeBuddy</p>`,
          });
        } catch (error) {
          throw new Meteor.Error("sendVerificationEmail.cannotSendMail", "Could not send verification email: " + error);
        }

        return User.update({ homeUniEmail }, { where: { id: userId } });
      }));
    },

    verifyEmailToken(token) {
      check(token, String);
      let decoded;

      try {
        decoded = jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);

        if (!decoded)
          return false;
      } catch (exc) {
        throw new Meteor.Error("verifyEmailTokenException", exc);
      }

      return User.findOne({ id: decoded.userId }).then(function(result) {
        const user = result.get();

        if (!user)
          throw new Meteor.Error("verifyEmailToken.undefinedUser", "No such user.")
        if (user.homeUniEmail != decoded.homeUniEmail)
          throw new Meteor.Error("verifyEmailToken.emailMismatch", "Email mismatch.")
        else
          return User.update({ homeUniEmailVerified: true }, { where: { id: decoded.userId } });
      });
    },

    // Authentication

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
