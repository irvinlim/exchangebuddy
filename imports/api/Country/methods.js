import Country from '.';

if (Meteor.isServer) {

  export const bulkCreateOrUpdate = (countries) => {
    if (!countries)
      return;

    countries.forEach(ctry => {
      Country.upsert(ctry);
    });
  };

}
