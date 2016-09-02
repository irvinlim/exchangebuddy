import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { closeSwitchGroupDialog } from '../../../client/actions/switchGroupDialog';

// Component
import ChildComponent from './SwitchGroupDialog';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();

  if (!user)
    return;

  Meteor.call('User.getGroups', user.id, (err, groups) => {
    onData(null, { user, groups });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state, ownProps) => {
  return {
    open: !!state.switchGroupDialogOpen
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ closeSwitchGroupDialog }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
