import Country from '.';

if (Meteor.isServer) {

  Meteor.methods({

    'Country.get'(countryCode) {
      check(countryCode, String);

      return Country.findById(countryCode).then(function(result) {
        const country = result && result.get({ plain: true });
        return country;
      });
    },

  });

  export const bulkCreateOrUpdate = (countries) => {
    if (!countries)
      return;

    countries.forEach(ctry => {
      Country.upsert(ctry);
    });
  };

}
