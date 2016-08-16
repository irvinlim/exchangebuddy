import { Meteor } from 'meteor/meteor';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(Meteor.settings.private.databaseUrl, {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
