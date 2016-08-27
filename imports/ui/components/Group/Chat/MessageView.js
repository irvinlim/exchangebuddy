import React from 'react';
import Paper from 'material-ui/Paper';
import MessageList from './MessageList'

export default class MessageView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className="messages-container" zDepth={2}>
        <MessageList groupId={ this.props.groupId } />
      </Paper>
    );
  }
}
