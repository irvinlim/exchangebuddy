// Browser policy
import './browser-policy';

// Setup database
import './reactive-mysql';
import sequelize from '../../api';

// Wrap in Meteor.bindEnvironment to prevent error
sequelize.sync().then(Meteor.bindEnvironment(function () {

  // Add fixtures
  import './fixtures';

}));

// Browser policy
import './browser-policy';

// Cloudinary
import './cloudinary';
