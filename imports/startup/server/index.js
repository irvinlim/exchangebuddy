// Browser policy
import './browser-policy';

// Setup database
import sequelize from '../../api';

// Wrap in Meteor.bindEnvironment to prevent error
sequelize.sync().then(Meteor.bindEnvironment(function () {

  // Add fixtures
  import './fixtures';

}));
