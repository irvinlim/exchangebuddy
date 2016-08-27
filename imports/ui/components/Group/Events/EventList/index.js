import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './EventList';

// react-komposer
const composer = (props, onData) => {
  const { source, uni } = props;

  if (source == 'Facebook') {
    Meteor.call('Group.getFbEvents', uni.countryCode, uni.latLng, (err, groupEvents) => {
      console.log(groupEvents);

      onData(null, { groupEvents });
    });
  } else if (source == 'Meetup') {
    // Temp: Set pageNumber = 0
    Meteor.call('Group.getMeetupEvents', uni.latLng, uni.city, 0, (err, res) => {
      onData(null, { groupEvents: res.results });
    });
  }
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
