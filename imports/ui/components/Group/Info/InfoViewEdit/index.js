import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../../../../client/actions/snackbar';

// Component
import ChildComponent from './InfoViewEdit';

// react-komposer
const composer = (props, onData) => {
  const { about, groupId, sectionId } = props;

  if (!groupId || !about)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {

    if (!group)
      return;

    if (about == 'country') {
      Meteor.call('CountryInfoItem.getLatestRevision', group.university.countryCode, sectionId, (err, item) => {
        if (!item)
          Meteor.call('CountryInfoSection.get', sectionId, (err, section) => {
            onData(null, { item: { section }, aboutId: group.university.countryCode });
          });

        else
          onData(null, { item, aboutId: group.university.countryCode});
      });
    } else if (about == 'university') {
      Meteor.call('UniversityInfoItem.getLatestRevision', group.universityId, sectionId, (err, item) => {
        if (!item)
          Meteor.call('UniversityInfoSection.get', sectionId, (err, section) => {
            onData(null, { item: { section }, aboutId: group.university.countryCode });
          });

        else
          onData(null, { item, aboutId: group.universityId });
      });
    }

  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.browserIsMobileWidth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
