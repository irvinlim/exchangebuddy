import University from '.';
import Country from '../Country';
import UniversityInfoItem from '../UniversityInfoItem';
import UniversityInfoSection from '../UniversityInfoSection';

import { mapObjPropsToArray } from '../../util/helper';

import { verifyToken } from '../User/methods';

if (Meteor.isServer) {

  Meteor.methods({

    'University.getAll'() {
      return University.findAll().then(function(universities) {
        return universities.map(uni => uni.get());
      });
    },

    'University.get'(id) {
      check(id, Number);

      return University.findOne({ where: { id } }).then(function(result) {
        return result && result.get();
      });
    },

    'University.getByName'(name) {
      check(name, String);

      return University.findOne({ where: { name } }).then(function(result) {
        return result && result.get();
      });
    },

    'University.getInfoItems'(universityId) {
      check(universityId, Number);

      return UniversityInfoItem.findAll({ where: { universityId }, include: [ { model: UniversityInfoSection, as: 'section' } ] }).then(function(result) {
        if (!result)
          return [];

        const items = result.map(item => item.get({ plain: true }));

        const newestItems = {};
        items.forEach(item => {
          if (!newestItems[item.section.id])
            newestItems[item.section.id] = item;
          else if (item.createdAt > newestItems[item.section.id].createdAt)
            newestItems[item.section.id] = item;
        });

        return mapObjPropsToArray(newestItems);
      });
    },

    'University.getEmptySections'(universityId) {
      check(universityId, Number);

      return UniversityInfoSection.findAll({}).then(function(sections) {
        return UniversityInfoItem.findAll({ where: { universityId } }).then(function(items) {
          const existingSectionIds = items.map(item => item.get().sectionId);
          return sections && sections.map(section => section.get({ plain: true })).filter(section => existingSectionIds.indexOf(section.id) == -1);
        });
      });
    },

    'University.setBgImage'(userToken, universityId, bgImageId) {
      check(userToken, String);
      check(universityId, Number);
      check(bgImageId, String);

      const user = verifyToken(userToken);

      if (!user)
        throw new Meteor.Error("University.setBgImage.notAuthenticated", "User token is not authenticated.");

      return University.update({ bgImageId }, { where: { id: universityId } });
    },

  });

  export const bulkCreateOrUpdate = (unis) => {
    if (!unis)
      return;

    return new Promise((resolve, reject) => {

      const promises = unis.map(uni => {
        return Country.findById(uni.countryCode).then(function(country) {
          if (country)
            return University.create(uni);
        });
      });

      Promise.all(promises).then(function() {
        resolve();
      });

    });
  };

}
