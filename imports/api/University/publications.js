import { Meteor } from 'meteor/meteor';

Meteor.publish('all-universities', function() {
  return LiveDB.select(
    `SELECT * FROM universities ORDER BY name ASC`,
    [ { table: 'universities' } ]
  );
});
