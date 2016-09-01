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

  Meteor.call('User.getGroups', user.id, (err, groups) => {
    const defaultGroup = groups.reduce((p, group) => group.id == user.defaultGroupId ? group : p);

    onData(null, {
      initialValues: {
        exchangeUniName: defaultGroup && defaultGroup.university.name,
        exchangeUniYear: defaultGroup && defaultGroup.year,
        exchangeTerm: defaultGroup && defaultGroup.term,
      }
    });
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
