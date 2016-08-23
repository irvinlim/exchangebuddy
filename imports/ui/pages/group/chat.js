import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reducer as reduxFormReducer } from 'redux-form'
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import SubmitForm from '../../components/Group/Chat/SubmitForm'
import MessageView from '../../components/Group/Chat/MessageView'

const showResults = values =>
  new Promise((resolve, reject) => {
    setTimeout(() => {  // simulate server latency
      // TODO: Replace groupId with actual group ID from prop
      Meteor.call('GroupChatMessage.sendToGroup', { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId: 1, content: values.message }, (err, success) => {
        if (err)
          reject("Cannot add message.", err);

        resolve();
      });
    }, 500)
  })

const GroupChat = ({ messages }) => (
  <Grid>
    <MessageView messages={ messages } />
    <SubmitForm onSubmit={ showResults }/>
  </Grid>
);

function mapStateToProps(state, ownProps){
  var messages = [{
    message:'How do I use this messaging app?',
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/f',
  },{
    message:'baba ba?',
    inbound: true,
    textColor: 'white',
    backColor: 'gray',
    avatar: 'https://avatars.io/twitter/a',
  },{
    message:'How do qwq qw qw?',
    inbound: true,
    textColor: 'white',
    backColor: 'gray',
    avatar: 'https://avatars.io/twitter/q',
    src: 'https://media.giphy.com/media/BCtjVLKRoFVza/giphy.gif',
  },{
    message:'How do I use this messaging app?',
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/f',
  },{
    message:'How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? How do I use this messaging app? ',
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/f',
  },{
    message:'How do I use this messaging app?',
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/f',
  },{
    message:'How do I use this messaging app?',
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/f',
  }];

  return { messages };
}

export default connect(mapStateToProps)(GroupChat);
