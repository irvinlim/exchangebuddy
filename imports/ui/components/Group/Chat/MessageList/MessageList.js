import React from 'react';

import { formatTime } from '../../../../../util/helper';
import * as UserHelper from '../../../../../util/user';

const Message = ({ message, currentUser, idx }) => {
  const { content, user, createdAt } = message;
  return (
    <div key={ idx } className="message-row">
      <div className="message-avatar">{ UserHelper.getAvatar(user, 40) }</div>
      <div className="message-body">
        <h5 className="message-username">{ user.displayName } <span className="message-timestamp">{ formatTime(createdAt) }</span></h5>
        <p className="message-content">{ content }</p>
      </div>
    </div>
  );
};

const chatScrollToLatest = () => {
  $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
};

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    chatScrollToLatest();
  }

  componentDidUpdate() {
    chatScrollToLatest();
  }

  render() {
    const { messages, user } = this.props;

    return (
      <div>
        { messages.length > 0 && messages.map((message, idx) => <Message message={ message } currentUser={ user } idx={ idx } />) }
      </div>
    )
  }
}
