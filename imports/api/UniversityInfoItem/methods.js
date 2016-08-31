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

      return UniversityInfoItem.findOne({
        where: { universityId, sectionId },
        order: [[ 'createdAt', 'DESC' ]],
        include: [{ model: UniversityInfoSection, as: 'section' }],
      }).then(function(result) {
        return result && result.get({ plain: true });
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
        else if (!section.editable)
          throw new Meteor.Error('UniversityInfoItem.pushRevision.notEditable', 'Section is not editable.');

        const user = verifyToken(userToken);

        if (!user || user.id != userId)
          throw new Meteor.Error("UniversityInfoItem.pushRevision.notAuthenticated", "User token is not authenticated.");

        return UniversityInfoItem.create({ sectionId, universityId, content, userId });
      }).then(function(result) {
        return true;
      });
    },

  });
}
