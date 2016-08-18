import University from '.';

if (Meteor.isServer) {

  export const bulkCreateOrUpdate = (unis) => {
    if (!unis)
      return;

    unis.forEach(uni => {
      University.upsert(uni);
    });
  };

}
