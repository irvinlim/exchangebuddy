import React from 'react';
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

const GroupChat = ({ messages, params }) => (
  <Grid>
    <div className="chat-container">
      <MessageView groupId={ params.id } />
      <SubmitForm onSubmit={ showResults }/>
    </div>
  </Grid>
);

export default GroupChat;
