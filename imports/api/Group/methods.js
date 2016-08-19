import { Meteor } from 'meteor/meteor';
import Group from '.';
import University from '../University';

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
      }).then(function(group) {
        // NOTE: Not working for now.
        //
        // console.log(group[0]);

        // if (group)
        //   return group[0].addUser(userId);
      });
    },
  });
}
