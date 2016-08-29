import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoView from '../../components/InfoView/InfoView';

const ViewInfo = () => (
  <Grid>
    <Row>
      <Col xs={12} >
        <InfoView />
      </Col>
    </Row>
  </Grid>
)

export default ViewInfo;
