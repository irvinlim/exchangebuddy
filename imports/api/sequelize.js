import { Meteor } from 'meteor/meteor';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(Meteor.settings.private.MySQL.connectionString, {
  dialect: 'mysql',
  logging: true,
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

export default sequelize;
