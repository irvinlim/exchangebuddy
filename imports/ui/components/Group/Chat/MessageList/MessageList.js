import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { formatTime } from '../../../../../util/helper';
import * as UserHelper from '../../../../../util/user';

const Message = ({ message, currentUser }) => {
  const { content, user, createdAt, type, eventPosting, id } = message;

  return (
    <div>
      { type === "user" ?
      <div className="message-row">
        <div className="message-avatar">{ UserHelper.getAvatar(user, 40) }</div>
        <div className="message-body">
          <h5 className="message-username">{ user.displayName } <span className="message-timestamp">{ formatTime(createdAt) }</span></h5>
          <p className="message-content">{ content }</p>
        </div>
      </div>
      : type === "eventFB" ?
      <div className="message-row">
        <div className="message-avatar">{ UserHelper.getAvatar(user, 40) }</div>
        <div className="message-body">
        <h5 className="message-username">{ user.displayName } posted an event <span className="message-timestamp"> { formatTime(createdAt) }</span></h5>
        <Card className="event-item-card" initiallyExpanded={false}>
        <CardHeader
          title={ eventPosting.name }
          subtitle={ `${ moment(eventPosting.startTime).format("D MMM, ddd, hA") }` }
          avatar={ eventPosting.profilePicture }
          actAsExpander={ true }
          showExpandableButton={ true }
        />
        <CardMedia expandable={true} >
          <img src={ eventPosting.coverPicture } />
        </CardMedia>
        <CardText expandable={true}>
          { content }
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton primary={true} style={{margin: "3px 6px"}} label="View on Facebook" target="_blank" href={`https://facebook.com/events/${eventPosting.id}`} />
        </CardActions>
      </Card>
        </div>
      </div>
      : type === "eventMU" ?
      <div>
      </div>
      :
      <div />
      }
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
      <div className="messages-container">
        { messages.length > 0 && messages.map((message, idx) => <Message message={ message } currentUser={ user } key={ idx } />) }
      </div>
    )
  }
}
