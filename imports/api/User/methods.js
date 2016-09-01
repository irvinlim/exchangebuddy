const jwt = require('jsonwebtoken');

// Models
import User from '.';
import University from '../University';

// Helpers
import UserHelper from '../../util/user';

if (Meteor.isServer) {
  Meteor.methods({

    'User.get'(id) {
      check(id, Number);

      return User.findOne({ where: { id }, include: [{ model: University, as: 'homeUniversity' }] }).then(function(result) {
        return result && result.get({ plain: true });
      });
    },

    'User.getUsers'(ids) {
      check(ids, Array);

      return User.findAll({ where: { id: { in: ids } } }).then(function(result) {
        return result && result.map(res => res.get({ plain: true }));
      });
    },

    'User.updateProfile'(values) {
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

    // Groups

    'User.getGroups'(userId) {
      check(userId, Number);

      return User.findOne({ where: { id: userId } }).then(function(userResult) {
        return userResult.getGroups({ include: [{ model: University }] });
      }).then(function(result) {
        return result.map(x => x.get({ plain: true }));
      });
    },

    // Verify email

    'User.sendVerificationEmail'(values) {
      check(values, Object);

      const { userId, homeUniEmail } = values;
      check(userId, Number);
      check(homeUniEmail, String);

      return User.findOne({
        where: { id: userId }
      }).then(Meteor.bindEnvironment(function(result) {
        const user = result.get();
        const token = jwt.sign({ userId, homeUniEmail }, Meteor.settings.private.jsonWebTokenSecret, { expiresIn: "2d" });
        const verifyUrl = Meteor.absoluteUrl("verify/" + token);

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

    'User.verifyEmailToken'(token) {
      check(token, String);
      let decoded;

      try {
        decoded = jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);

        if (!decoded)
          return false;
      } catch (exc) {
        throw new Meteor.Error("User.verifyEmailToken.jwtVerifyException", exc);
      }

      if (!decoded.userId || !decoded.homeUniEmail)
        throw new Meteor.Error("User.verifyEmailToken.emailTokenSignatureMismatch", "Encrypted email token has the wrong signature.");

      return User.findById(decoded.userId).then(function(result) {
        const user = result.get();

        if (!user)
          throw new Meteor.Error("User.verifyEmailToken.undefinedUser", "No such user.");
        else if (user.homeUniEmail != decoded.homeUniEmail) {
          console.log(user.homeUniEmail, decoded.homeUniEmail);
          throw new Meteor.Error("User.verifyEmailToken.emailMismatch", "Email mismatch.");
        }
        else if (user.homeUniEmailVerified)
          return true;
        else
          return User.update({ homeUniEmailVerified: true }, { where: { id: decoded.userId } });
      });
    },

    // Authentication

    'User.verifyToken'(token) {
      check(token, String);

      let decoded = null;

      try {
        decoded = jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);
      } catch (exc) {
        throw new Meteor.Error("verifyTokenException", exc);
      }

      return decoded;
    },

    'User.loginFacebook'(response) {
      check(response, Object);

      if (!response || !response.userID)
        throw new Meteor.Error("User.loginFacebook.invalidResponse", "Invalid response from Facebook.");

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
          throw new Meteor.Error("User.loginFacebook.invalidUser", "Could not fetch authenticated user.");

        return {
          user: user,
          token: jwt.sign(user, Meteor.settings.private.jsonWebTokenSecret, {
            expiresIn: "14d"
          })
        };
      }).catch(function(errors) {
        throw new Meteor.Error("User.loginFacebook.sequelizeError", `Internal Sequelize error: ${errors}`);
      });
    },

  });

  export const verifyToken = (token) => {
    let decoded = null;

    try {
      decoded = jwt.verify(token, Meteor.settings.private.jsonWebTokenSecret);
    } catch (exc) {
      decoded = null;
    }

    return decoded;
  };
}
