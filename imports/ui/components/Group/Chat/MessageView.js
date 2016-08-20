import React from 'react';
import Paper from 'material-ui/Paper';
import MessageList from './MessageList'

const messageStyle ={ height: $(window).height()*4/5, padding: "2%", overflow: "scroll" }

export default class MessageView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Paper id="messages-container" style={messageStyle} zDepth={2}>
        <MessageList messages = { this.props.messages } />
      </Paper>
    )
  }
}
