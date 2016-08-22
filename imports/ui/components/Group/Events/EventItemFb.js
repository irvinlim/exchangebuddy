import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

const EventItemFb = ({ groupEvent }) => (
  <Row>
    <Col xs={12}>
      <Card>
        <CardHeader
          title={ groupEvent.title }
          actAsExpander={true}
          showExpandableButton={false}
        />
        <CardText>
        	{groupEvent.description}
        </CardText>
      </Card>
    </Col>
  </Row>
)

export default EventItemFb;
