import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import truncate from 'truncate';

const EventItemMu = ({ groupEvent }) => (
  <Row>
    <Col xs={12}>
      <Card className="event-item-card">
        <CardHeader
          title={ groupEvent.name }
          subtitle={ `${ moment(groupEvent.time).format("Q MMM ddd, hA") } - ${groupEvent.yes_rsvp_count} RSVPs` }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText className="event-item-text" expandable={true}>
        	{ ReactHtmlParser(truncate(groupEvent.description, 500)) }
        </CardText>
        <CardActions expandable={true}>
          <div style={{textAlign: "center"}}>
          <RaisedButton
            backgroundColor="#E0393D"
            labelColor="#FFFFFF"
            style={{display: "inline-block"}}
            label="View on Meetup.com"
            target="_blank"
            href={groupEvent.event_url}
          />
          </div>
        </CardActions>

      </Card>
    </Col>
  </Row>
)

export default EventItemMu;
