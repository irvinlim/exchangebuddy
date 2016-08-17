import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const InfoItem = ({ info }) => (
  <Row>
    <Col xs={12}>
      <Card>
        <CardHeader
          title={ info.content }
          actAsExpander={true}
          showExpandableButton={false}
        />
      </Card>
    </Col>
  </Row>
  )

const InfoSection = ({ items }) => (
  <Row>
    <Col xs={12}>
    {items.map( item => ( <InfoItem key={ item.createdAt } info={ item } /> ))}
    </Col>
  </Row>

  )

export default InfoSection;
