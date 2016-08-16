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
    type: DataType.STRING(100),
  },

  profilePictureUrl: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.ENUM('male', 'female', 'others'),
  },

  bio: {
    type: DataType.TEXT('long'),
  },

  website: {
    type: DataType.STRING(255),
  },

  birthday: {
    type: DataType.DATEONLY(),
  },

  fbUserId: {
    type: DataType.BIGINT(64),
    unique: true,
  },

  fbToken: {
    type: DataType.STRING(100),
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

  countryId: {
    type: DataType.INTEGER(),
  }

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
