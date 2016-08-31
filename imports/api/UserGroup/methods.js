import { Meteor } from 'meteor/meteor';

import { onGroupCreate } from '../Group/methods';

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

      let group, isNewGroup;

      return University.findOne({ where: { name: exchangeUniName } }).then(function(result) {
        if (!result)
          throw new Meteor.Error("UserGroup.addUserToGroup.undefinedUniversity", "No such university found.");

        const uni = result.get();
        const values = { universityId: uni.id, year: exchangeUniYear, term: exchangeTerm };

        return Group.findOrCreate({ where: values, defaults: values });
      }).then(function(result) {

        group = result[0];
        isNewGroup = result[1];

        // Run hooks if was an insertion
        if (isNewGroup)
          return onGroupCreate(group.get({ plain: true }));
        else
          return;

      }).then(function(result) {

        // Add user to group
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
