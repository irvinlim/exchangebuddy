import DataType from 'sequelize';
import sequelize from '../sequelize';

const tableName = 'users';

const User = sequelize.define(tableName, {

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    unique: true,
  },

  displayName: {
    type: DataType.TEXT(),
  },

  profilePictureId: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.ENUM('male', 'female', 'others'),
  },

  bio: {
    type: DataType.TEXT('long'),
  },

  website: {
    type: DataType.TEXT(),
  },

  birthday: {
    type: DataType.DATEONLY(),
  },

  // Don't use BIGINT because there's some serious bug in Sequelize or something...
  // A BIGINT has at most 20 digits (if unsigned)
  fbUserId: {
    type: DataType.STRING(20),
    unique: true,
  },

  fbToken: {
    type: DataType.TEXT(),
  },

  fbTokenExpiresAt: {
    type: DataType.DATE(),
  },

  homeUniId: {
    type: DataType.INTEGER(),
  },

  homeUniEmail: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  homeUniEmailVerified: {
    type: DataType.BOOLEAN(),
  },

  // 2-letter country code
  homeCountryCode: {
    type: DataType.CHAR(2),
  },

  defaultGroupId: {
    type: DataType.INTEGER(),
  }

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
