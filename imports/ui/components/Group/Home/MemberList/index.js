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
    Meteor.call('Group.getUsers', groupId, (err, groupUsers) =>
      onData(null, {
        groupUsers
      }));
  }

};

export default composeWithTracker(composer, Loading)(ChildComponent);
