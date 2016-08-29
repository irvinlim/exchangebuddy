import University from '.';
import UniversityInfoItem from '../UniversityInfoItem';
import UniversityInfoSection from '../UniversityInfoSection';

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
        return result && result.map(item => item.get({ plain: true }));
      });
    },

  });

  export const bulkCreateOrUpdate = (unis) => {
    if (!unis)
      return;

    unis.forEach(uni => {
      University.upsert(uni);
    });
  };

}
