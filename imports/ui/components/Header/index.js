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
  const groupId = parseInt(props.params.id);

  if (!groupId)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {
    groupMemberCount = 10;
    group.size = groupMemberCount;

    onData(null, {
      user,
      uni: group.university,
      group
    });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state, ownProps) => {
  return{
    params: ownProps.params,
    tab: ownProps.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);

export default Header;
