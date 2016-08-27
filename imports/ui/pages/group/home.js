import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { FacebookButton, FacebookCount } from 'react-social';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import MemberList from '../../components/Group/Home/MemberList';

const buttonStyle = {
  textAlign: "center",
  marginTop: 25
}

const GroupHome = ({ params }) => (
  <Grid>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "2em" }}><span>Who's Going</span></h3>
        <MemberList groupId={ params.id } />
      </Col>
    </Row>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "1.5em" }}><span>Exchange Buddy Is Better With Friends</span></h3>
        <Row>
          <Col xs={12} sm={6} md={6} style={buttonStyle}>
            <FlatButton label="Share On FaceBook" />
            <FacebookButton url="http://exchangebuddy.irvinlim.com/" appId={Meteor.settings.public.Facebook.appId}>
              <FacebookCount url="http://exchangebuddy.irvinlim.com/" /> {"Share on Facebook"}
            </FacebookButton>
          </Col>
          <Col xs={12} sm={6} md={6} style={buttonStyle}>
            <FlatButton label="Invite Friends" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default GroupHome;
