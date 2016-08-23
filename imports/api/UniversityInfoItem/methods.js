import { Meteor } from 'meteor/meteor';

import University from '../University';
import UniversityInfoItem from '.';
import UniversityInfoSection from '../UniversityInfoSection';

import { verifyToken } from '../User/methods';

if (Meteor.isServer) {
  Meteor.methods({

    'UniversityInfoItem.getLatestRevision': (universityId, sectionId) => {
      check(universityId, Number);
      check(sectionId, Number);

      return UniversityInfoItem.findOne({ where: { universityId, sectionId }, order: [[ 'createdAt', 'DESC' ]] }).then(function(result) {
        return result && result.get();
      });
    },

    'UniversityInfoItem.pushRevision': (values) => {
      check(values, Object);

      const { type, universityId, userToken, userId, content, sectionId } = values;
      check(universityId, Number);
      check(userToken, String);
      check(userId, Number);
      check(content, String);
      check(sectionId, Number);

      return University.findById(universityId).then(function(result) {
        const university = result && result.get();

        if (!university)
          throw new Meteor.Error('UniversityInfoItem.pushRevision.undefinedUniversity', 'No such university.');

        return UniversityInfoSection.findById(sectionId);
      }).then(function(result) {
        const section = result && result.get();

        if (!section)
          throw new Meteor.Error('UniversityInfoItem.pushRevision.undefinedSection', 'No such section.');
        else if (!section.isEditable)
          throw new Meteor.Error('UniversityInfoItem.pushRevision.notEditable', 'Section is not editable.');

        return section;
      }).then(function(result) {
        const user = verifyToken(userToken);

        if (!user || user.id != userId)
          throw new Meteor.Error("UniversityInfoItem.pushRevision.notAuthenticated", "User token is not authenticated.");
      }).then(function(result) {
        return UniversityInfoItem.insert({ sectionId, universityId, content, userId });
      });
    },

  });
}
