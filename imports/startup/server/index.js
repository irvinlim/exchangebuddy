// Set environment variables
import './env-vars';

// Browser policy
import './browser-policy';

// Reactive mysql
// Disable for now
// import './reactive-mysql';

// Setup database
import '../../api-mongo';
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

// Picker - Server side router
import './picker';
