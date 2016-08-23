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

  const initialValues = {
    displayName: user.displayName,
    gender: user.gender,
  };

  // Get homeUni
  if (user.homeUniId)
    Meteor.call('getUniById', user.homeUniId, (err, homeUni) =>
      onData(null, {
        initialValues: {
          ...initialValues,
          homeUniName: homeUni ? homeUni.name : ""
        }
      }));
  else
    onData(null, { initialValues });

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
