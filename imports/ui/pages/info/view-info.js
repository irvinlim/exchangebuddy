import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import InfoView from '../../components/InfoView/InfoView';

const ViewInfo = () => (
  <Grid>
    <Row>
      <Col xs={12} >
        <InfoView />
      </Col>
    </Row>
    <Row>
      <Col xs={12} style={{marginTop: "18px"}}>
        <RaisedButton label="Edit" primary={true} />
        <RaisedButton label="Share" primary={true} />
        <RaisedButton label="Like" primary={true} />
      </Col>
    </Row>
  </Grid>
)

export default ViewInfo;
