import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './MemberList';

// react-komposer
const composer = (props, onData) => {

  const groupId = parseInt(props.groupId);

  // Get groupUsers
  if (groupId) {
    Meteor.call('Group.getUsers', groupId, (err, groupUsers) => {
      onData(null, {
        groupUsers
      })
    });
  }

};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from '../../../../../client/actions/browser';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.browserIsMobileWidth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
