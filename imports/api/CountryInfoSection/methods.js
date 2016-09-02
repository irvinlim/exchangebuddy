import { Meteor } from 'meteor/meteor';
import CountryInfoSection from '.';

if (Meteor.isServer) {
  Meteor.methods({

    'CountryInfoSection.get'(id) {
      check(id, Number);

      return CountryInfoSection.findById(id).then(function(result) {
        const section = result && result.get({ plain: true });
        return section;
      });
    },

  });
}
