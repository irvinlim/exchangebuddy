import { Meteor } from 'meteor/meteor';
import Group from '.';
import University from '../University';
import User from '../User';

if (Meteor.isServer) {
  Meteor.methods({

    addUserToGroup(values) {
      check(values, Object);

      const { userId, exchangeUniName, exchangeUniYear, exchangeTerm } = values;
      check(userId, Number);
      check(exchangeUniName, String);
      check(exchangeUniYear, Number);
      check(exchangeTerm, String);

      return University.findOne({ where: { name: exchangeUniName } }).then(function(result) {
        if (!result)
          throw new Meteor.Error("addUserToGroup.undefinedUniversity", "No such university found.");

        const uni = result.get();
        const values = { universityId: uni.id, year: exchangeUniYear, term: exchangeTerm };

        return Group.findOrCreate({ where: values, defaults: values });
      }).then(function(result) {
        const group = result[0];

        if (group)
          return group.addUser(userId);
        else
          return false;
      }).then(function(result) {
        if (result)
          return true;
        else
          return false;
      });
    },

    getUserGroups(userId) {
      check(userId, Number);

      return User.findOne({ where: { id: userId } }).then(function(userResult) {
        return userResult.getGroups();
      }).then(function(result) {
        return result.map(x => x.get({ plain: true }));
      });
    },

  });
}
