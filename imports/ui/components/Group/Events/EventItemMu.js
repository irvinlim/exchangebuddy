import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import striptags from 'striptags';
import truncate from 'truncate';

const EventItemMu = ({ groupEvent }) => (
  <Row>
    <Col xs={12}>
      <Card>
        <CardHeader
          title={ groupEvent.title }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
        	{ truncate(striptags(groupEvent.description), 500) }
        </CardText>
      </Card>
    </Col>
  </Row>
)

export default EventItemMu;
