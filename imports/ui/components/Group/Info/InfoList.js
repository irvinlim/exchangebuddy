import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import InfoSection from './InfoSection';
import InfoSidebar from './InfoSidebar';

const InfoList = ({ group, university, countrySectionItems, uniSectionItems }) => (
  <Row>
    <Col xs={12} md={4}>
      <InfoSidebar university={ university }/>
    </Col>
    <Col xs={12} md={8}>
      <InfoSection items={ countrySectionItems } />
      <InfoSection items={ uniSectionItems } />
    </Col>
  </Row>
)

export default InfoList;
