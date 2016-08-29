import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoView from '../../components/InfoView/InfoView';

const ViewInfo = () => (
  <div className="info-container" >
  <Grid>
    <Row>
      <Col xs={12} >
        <InfoView />
      </Col>
    </Row>
  </Grid>
  </div>
)

export default ViewInfo;
