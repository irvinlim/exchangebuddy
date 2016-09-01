import { Meteor } from 'meteor/meteor';
import CountryInfoSection from '.';

if (Meteor.isServer) {
  Meteor.methods({

    'CountryInfoSection.get'(countryCode) {
      check(countryCode, String);

      return CountryInfoSection.findById(countryCode).then(function(result) {
        const section = result && result.get({ plain: true });
        return section;
      });
    },

  });
}
