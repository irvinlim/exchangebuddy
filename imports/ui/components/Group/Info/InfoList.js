import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import InfoSectionCountry from './InfoSectionCountry';
// import InfoSidebar from './InfoSidebar';

    // <Col xs={12} md={4}>
    //   <InfoSidebar university={ university }/>
    // </Col>

      // <InfoSection items={ uniSectionItems } />

const InfoList = ({ group, university, countrySectionItems, uniSectionItems }) => (
  <Row>
    <Col xs={12}>
      <InfoSectionCountry items={ countrySectionItems } />
    </Col>
  </Row>
)

export default InfoList;
