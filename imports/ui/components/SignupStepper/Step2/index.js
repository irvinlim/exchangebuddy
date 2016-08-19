import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './Step2';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();

  onData(null, {

  });

};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state) => {
  return {
    formState: state.form
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const Step2 = connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);

export default Step2;
