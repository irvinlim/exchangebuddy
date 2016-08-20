// numtel:mysql
const { host, port, user, password, database } = Meteor.settings.private.MySQL;
LiveDB = new LiveMysql({ host, port, user, password, database });

const closeAndExit = function() {
  LiveDB.end();
  process.exit();
};

// Close connections on hot code push
process.on('SIGTERM', closeAndExit);

// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);
