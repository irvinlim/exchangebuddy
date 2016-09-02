import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import GroupWelcome from '../../components/Group/Home/GroupWelcome';
import MemberList from '../../components/Group/Home/MemberList';
import FacebookShare from '../../components/Button/FacebookShare';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../../client/actions/snackbar';


const buttonStyle = {
  textAlign: "center",
  margin: "15px auto",
  width: "100%",
};

const joinedGroupStory = (params, actions) => () => {
  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    FB.api('me/exchangebuddy:join', 'post',
      {
        'access_token': accessToken,
        'exchange_group': window.location.href,
        'explicitly_shared': true,
      },
      function(response) { actions.showSnackbar("Published activity on facebook."); }
    );
  } else if (response.status === 'not_authorized') {
    actions.showSnackbar("You must authorize the application.")
  } else {
    actions.showSnackbar("You must be log in before inviting.");
  }
 });
}

const GroupHome = ({ params, actions }) => (
  <Grid>

    <Row>
      <Col xs={12}>
        <GroupWelcome groupId={ parseInt(params.id) } />
      </Col>
    </Row>

    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "1.3em" }}><span>Who's going</span></h3>
        <p className="small-text" style={{ textAlign: 'center' }}>These students will be on exchange at the same time as you.</p>
        <MemberList groupId={ parseInt(params.id) } />
      </Col>
    </Row>

    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <h3 className="pinline" style={{ fontSize: "1.3em" }}><span>ExchangeBuddy is better with friends</span></h3>
        <p className="small-text" style={{ textAlign: 'center' }}>Get your friends to join in the fun!</p>
        <Row>
          <Col xs={8} sm={6} style={buttonStyle}>
            <RaisedButton primary={true}
              className="raised-btn"
              label="Post Story to Facebook"
              labelStyle={{ paddingLeft: "9px", paddingRight:"9px" }}
              onTouchTap={ joinedGroupStory(params, actions) }/>
          </Col>
          <Col xs={8} sm={6} style={buttonStyle}>
            <RaisedButton primary={true}
              className="raised-btn"
              label="Invite Facebook Friends"
              labelStyle={{ paddingLeft: "9px", paddingRight:"9px" }} />
          </Col>
        </Row>
      </Col>
    </Row>

  </Grid>
);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(GroupHome);
