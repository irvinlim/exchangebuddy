import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reducer as reduxFormReducer } from 'redux-form'

import Message from 'chat-template/dist/Message';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import SubmitForm from '../../components/Group/Chat/SubmitForm'

const messageStyle ={ height: $(window).height()*4/5, padding: "2%" }

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })


const MessageList = ({ messages }) => (
  <div>
  { messages.length>0 && messages.map(message => (
    <Message height={300} message={message} />
  )) }
  </div>
)

const GroupChat = ({ messages }) => (
  <Grid>
    <Paper style={messageStyle} zDepth={2}>
      <MessageList messages = { messages } />
    </Paper>
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
    inbound: false,
    textColor: 'white',
    backColor: "lightgreen",
    avatar: 'https://avatars.io/twitter/q',
    src: 'https://media.giphy.com/media/BCtjVLKRoFVza/giphy.gif',
  }];

  return { messages };
}

export default connect(mapStateToProps)(GroupChat);
