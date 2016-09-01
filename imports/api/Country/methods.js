import Country from '.';
import CountryInfoItem from '../CountryInfoItem';
import CountryInfoSection from '../CountryInfoSection';

import { mapObjPropsToArray } from '../../util/helper';

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

      return CountryInfoItem.findAll({ where: { countryCode }, include: [ { model: CountryInfoSection, as: 'section' } ] }).then(function(result) {
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

    'Country.getEmptySections'(countryCode) {
      check(countryCode, String);

      return CountryInfoSection.findAll({}).then(function(sections) {
        return CountryInfoItem.findAll({ where: { countryCode } }).then(function(items) {
          const existingSectionIds = items.map(item => item.get().sectionId);
          return sections && sections.map(section => section.get({ plain: true })).filter(section => existingSectionIds.indexOf(section.id) == -1);
        });
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
