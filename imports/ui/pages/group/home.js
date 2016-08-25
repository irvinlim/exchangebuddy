import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import MemberList from '../../components/Group/Home/MemberList';

const GroupHome = ({ params }) => (
  <Grid>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline"><span>Who's Going</span></h3>
        <MemberList groupId={ params.id } />
      </Col>
    </Row>
  </Grid>
);

export default GroupHome;
