import University from '.';

if (Meteor.isServer) {

  Meteor.methods({

    getAllUnis() {
      return University.findAll().then(function(universities) {
        return universities.map(uni => uni.get());
      });
    },

    getUniById(id) {
      check(id, Number);

      return University.findOne({ where: { id } }).then(function(result) {
        return result && result.get();
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
