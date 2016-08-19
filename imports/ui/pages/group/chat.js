import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reducer as reduxFormReducer } from 'redux-form'
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import SubmitForm from '../../components/Group/Chat/SubmitForm'
import MessageView from '../../components/Group/Chat/MessageView'

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
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
