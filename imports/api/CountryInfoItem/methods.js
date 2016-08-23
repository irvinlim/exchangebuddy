import { Meteor } from 'meteor/meteor';

import Country from '../Country';
import CountryInfoItem from '.';
import CountryInfoSection from '../CountryInfoSection';

import { verifyToken } from '../User/methods';

if (Meteor.isServer) {
  Meteor.methods({

    'CountryInfoItem.getLatestRevision': (countryCode, sectionId) => {
      check(countryCode, String);
      check(sectionId, Number);

      return CountryInfoItem.findOne({ where: { countryCode, sectionId }, order: [[ 'createdAt', 'DESC' ]] }).then(function(result) {
        return result && result.get();
      });
    },

    'CountryInfoItem.pushRevision': (values) => {
      check(values, Object);

      const { countryCode, userToken, userId, content, sectionId } = values;
      check(countryCode, String);
      check(userToken, String);
      check(userId, Number);
      check(content, String);
      check(sectionId, Number);

      return Country.findById(countryCode).then(function(result) {
        const country = result && result.get();

        if (!country)
          throw new Meteor.Error('CountryInfoItem.pushRevision.undefinedCountry', 'No such country.');

        return CountryInfoSection.findById(sectionId);
      }).then(function(result) {
        const section = result && result.get();

        if (!section)
          throw new Meteor.Error('CountryInfoItem.pushRevision.undefinedSection', 'No such section.');
        else if (!section.isEditable)
          throw new Meteor.Error('CountryInfoItem.pushRevision.notEditable', 'Section is not editable.');

        return section;
      }).then(function(result) {
        const user = verifyToken(userToken);

        if (!user || user.id != userId)
          throw new Meteor.Error("CountryInfoItem.pushRevision.notAuthenticated", "User token is not authenticated.");
      }).then(function(result) {
        return CountryInfoItem.insert({ sectionId, countryCode, content, userId });
      });
    },

  });
}