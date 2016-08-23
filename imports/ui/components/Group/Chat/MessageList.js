import React from 'react';
import Message from 'chat-template/dist/Message';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
      $('#messages-container').scrollTop($('#messages-container')[0].scrollHeight);
  }

  render() {
    const { messages } = this.props;
    return(
      <div>
      { messages.length>0 && messages.map((message, idx) => (
        <Message height={300} message={message} key={idx} />
        )) }
      </div>
    )
  }
}
