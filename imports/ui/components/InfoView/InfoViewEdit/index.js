import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './InfoViewEdit';

// react-komposer
const composer = (props, onData) => {
  const { about, groupId } = props;

  if (!groupId || !about)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {

    if (!group)
      return;

    if (about == 'country')
      onData(null, { aboutId: group.university.countryCode });
    else if (about == 'university')
      onData(null, { aboutId: group.universityId });

  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

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
