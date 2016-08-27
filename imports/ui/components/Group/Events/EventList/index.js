import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './EventList';

// react-komposer
const composer = (props, onData) => {
  const { source, uni } = props;
  const groupId = parseInt(props.groupId);

  if (groupId) {
    Meteor.call('Group.get', groupId, (err, group) => {

      if (!group)
        return;

      const uni = group.university;

      if (source == 'Facebook') {
        // Temp: Don't pass in uniLatLng
        Meteor.call('Group.getFbEvents', uni.countryCode, (err, groupEvents) => {
          onData(null, { groupEvents });
        });
      } else if (source == 'Meetup') {
        Meteor.call('Country.get', uni.countryCode, (err, country) => {
          // Temp: Set pageNumber = 0, use country's latlng
          const city = uni.city ? uni.city : country.name;

          Meteor.call('Group.getMeetupEvents', [country.lat, country.lng], city, 0, (err, res) => {
            onData(null, { groupEvents: res.results });
          });
        });
      }

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
