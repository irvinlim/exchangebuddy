import { Meteor } from 'meteor/meteor';

import Group from '../Group';
import University from '../University';
import User from '../User';

if (Meteor.isServer) {
  Meteor.methods({

    'UserGroup.addUserToGroup'(values) {
      check(values, Object);

      const { userId, exchangeUniName, exchangeUniYear, exchangeTerm } = values;
      check(userId, Number);
      check(exchangeUniName, String);
      check(exchangeUniYear, Number);
      check(exchangeTerm, String);

      return University.findOne({ where: { name: exchangeUniName } }).then(function(result) {
        if (!result)
          throw new Meteor.Error("UserGroup.addUserToGroup.undefinedUniversity", "No such university found.");

        const uni = result.get();
        const values = { universityId: uni.id, year: exchangeUniYear, term: exchangeTerm };

        return Group.findOrCreate({ where: values, defaults: values });
      }).then(function(result) {
        const group = result[0];

        if (group) {
          group.addUser(userId);
          return group;
        } else {
          throw new Meteor.Error("UserGroup.addUserToGroup.undefinedGroup", "No such Group found.");
        }
      }).then(function(group) {
        return User.update({ defaultGroupId: group.id }, { where: { id: userId } });
      });
    },

  });
}
