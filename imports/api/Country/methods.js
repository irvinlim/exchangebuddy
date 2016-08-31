import Country from '.';
import CountryInfoItem from '../CountryInfoItem';
import CountryInfoSection from '../CountryInfoSection';

if (Meteor.isServer) {

  Meteor.methods({

    'Country.get'(countryCode) {
      check(countryCode, String);

      return Country.findById(countryCode).then(function(result) {
        const country = result && result.get({ plain: true });
        return country;
      });
    },

    'Country.getInfoItems'(countryCode) {
      check(countryCode, String);

      return CountryInfoItem.findAll({ where: { countryCode }, group: ['sectionId'], include: [ { model: CountryInfoSection, as: 'section' } ] }).then(function(result) {
        return result && result.map(item => item.get({ plain: true }));
      });
    },

  });

  export const bulkCreateOrUpdate = (countries) => {
    if (!countries)
      return;

    return new Promise((resolve, reject) => {

      // Resolve upsert rejects so that Promise.all resolves

      const promises = countries.map(ctry => {
        return new Promise((res,rej) => Country.upsert(ctry).then(()=>res(), ()=>res()))
      });

      Promise.all(promises).then(function() {
        resolve();
      });

    });
  };

}
