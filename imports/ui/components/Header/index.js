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
  const user = Meteor.user();
  // const uni = University.find(user.homeUniId);
  let uni = { id: '10', name: 'Singapore University of Technology and Design', city: 'Singapore', logoImageId: 'logo-sutd-main_hphs2p', emailDomains: '10', countryId: '1', terms: 'Summer 2016', bgImageId: 'sutd-slider-aeriel-view_uckqr6_cdfnan'};
  // SELECT COUNT(user_id) WHERE group_id = groupId
  // Mock sum of group members
  groupMemberCount = 10;
  let group = { id: '1', universityId: '1', year: '2', term: '3' };
  group.size = groupMemberCount;

  onData(null, {
    user,
    uni,
    group
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
