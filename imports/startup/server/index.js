// Setup database
import sequelize from '../../api';
sequelize.sync();

// Add fixtures
import './fixtures';

// Browser policy
import './browser-policy';

// Cloudinary
import './cloudinary';
