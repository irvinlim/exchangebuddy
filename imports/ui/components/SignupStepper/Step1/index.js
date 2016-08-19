import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators

// Component
import ChildComponent from './Step1';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();

  // Get all universities
  Meteor.call('getAllUnis', (err, universities) => {
    // Get homeUni
    Meteor.call('getUniById', user.homeUniId, (err, homeUni) => {

      onData(null, {
        universities,
        initialValues: {
          displayName: user.displayName,
          gender: user.gender,
          homeUniName: homeUni ? homeUni.name : "",
        },
      });

    });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const Step1 = connect(null, mapDispatchToProps)(ComposedComponent);

export default Step1;