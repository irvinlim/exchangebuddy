import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

import Header from './Header';

const composer = (props, onData) => {
  onData(null, {
    // Pass in props to the component here
  });
};

export default composeWithTracker(composer, Loading)(Header);
