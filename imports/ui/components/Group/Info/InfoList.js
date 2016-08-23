import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import InfoSection from './InfoSection';

// TODO: Decide sidebar usage
// import InfoSidebar from './InfoSidebar';
//  <InfoSidebar university={ university }/>

const InfoList = ({ group, university, countrySectionItems, uniSectionItems }) => (
  <Row>
    <Col xs={12} style={{marginTop: "15px"}}>
      <h3 className="pinline"> <span>{ university.country } Tips</span> </h3>
      <InfoSection items={ countrySectionItems } />
    </Col>
    <Col xs={12} style={{marginTop: "15px"}}>
      <h3 className="pinline"> <span>{ university.name } Tips</span> </h3>
      <InfoSection items={ uniSectionItems } />
    </Col>
  </Row>
)

export default InfoList;
