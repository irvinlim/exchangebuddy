import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import MemberList from '../../components/Group/Home/MemberList';
import FacebookShare from '../../components/Button/FacebookShare';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  textAlign: "center",
  marginTop: 25
};

const GroupHome = ({ params }) => (
  <Grid>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "2em" }}><span>Who's going</span></h3>
        <MemberList groupId={ params.id } />
      </Col>
    </Row>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "1.5em" }}><span>ExchangeBuddy is better with friends</span></h3>
        <Row>
          <Col xs={12} sm={6} md={6} style={buttonStyle}>
            <FacebookShare groupId={ params.id } />
          </Col>
          <Col xs={12} sm={6} md={6} style={buttonStyle}>
            <RaisedButton primary={true} label="Invite Friends" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default GroupHome;
