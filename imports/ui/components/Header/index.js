import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../../client/actions/snackbar';

// Component
import ChildComponent from './Header';

// react-komposer
const composer = (props, onData) => {
  onData(null, {
    user: Meteor.user(),
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

const Header = connect(null, mapDispatchToProps)(ComposedComponent);

export default Header;
