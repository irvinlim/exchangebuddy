import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import truncate from 'truncate';

const EventItemFb = ({ groupEvent }) => (
  <Row>
    <Col xs={12}>
      <Card className="event-item-card">
        <CardHeader
          title={ groupEvent.name }
          subtitle={ `${ moment(groupEvent.startTime).format("Q MMM, ddd, hA") } - ${groupEvent.stats.attending} attending` }
          avatar={ groupEvent.venue.profilePicture || groupEvent.profilePicture }
          actAsExpander={ true }
          showExpandableButton={ true }
        />
        <CardMedia expandable={true} >
          <img src={ groupEvent.coverPicture } />
        </CardMedia>
        <CardText expandable={true}>
        	{ truncate(groupEvent.description, 300) }
        </CardText>
        <CardActions expandable={true}>
          <div style={{textAlign: "center"}}>
          <RaisedButton
            primary={true}
            style={{display: "inline-block"}}
            label="View on Facebook"
            target="_blank"
            href={`https://facebook.com/events/${groupEvent.id}`}
          />
          </div>
        </CardActions>
      </Card>
    </Col>
  </Row>
)

export default EventItemFb;
