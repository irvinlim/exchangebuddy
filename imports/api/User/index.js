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

  fbUserId: {
    type: DataType.BIGINT(64),
    unique: true,
  },

  fbToken: {
    type: DataType.TEXT(),
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
  }

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
