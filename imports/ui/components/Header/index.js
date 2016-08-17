import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

import Header from './Header';

const composer = (props, onData) => {
  onData(null, {
    user: Meteor.user()
  });
};

export default composeWithTracker(composer, Loading)(Header);
