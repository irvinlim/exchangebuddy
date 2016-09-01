import { Meteor } from 'meteor/meteor';
import UniversityInfoSection from '.';

if (Meteor.isServer) {
  Meteor.methods({

    'UniversityInfoSection.get'(id) {
      check(id, Number);

      return UniversityInfoSection.findById(id).then(function(result) {
        const section = result && result.get({ plain: true });
        return section;
      });
    },

  });
}
