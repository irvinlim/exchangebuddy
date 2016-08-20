import { Meteor } from 'meteor/meteor';

Meteor.publish('all-universities', function() {
  return LiveDB.select(
    `SELECT * FROM universities ORDER BY name ASC`,
    [ { table: 'universities' } ]
  );
});

Meteor.publish('university-by-id', function(id) {
  check(id, Number);

  return LiveDB.select(
    `SELECT * FROM universities WHERE id = '${LiveDB.db.escape(id)}'`,
    [ { table: 'universities' } ]
  );
});
