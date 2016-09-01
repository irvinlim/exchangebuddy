import React from 'react';
import LoginButton from '../components/LoginButton';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

const landingContainerStyle = {
  minHeight: $(window).height(),
  backgroundColor: "darkslategray",
}

const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `,
  minHeight: $(window).height(),
}

const Home = () => (
  <div id="landing-container" style={landingContainerStyle}>
    <div id="welcome-header" style={landingImg}>

      <div id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 150, "exchangebuddy-logo") }
      </div>

      <div id="welcome-header-title">
        <h2 id="app-title">Find out who else is on an adventure</h2>
        <p className="app-subtitle">Share tips for the trip, by students, for students, find travel buddies. </p>
        <p className="app-subtitle">Forget the random facebook groups and google forms, all you need is right here. </p>
      </div>

      <div id="login-button"><LoginButton /></div>

      <div id="feature-list">
        <Grid>
        <div className="row center-xs center-md feature-row">
        <Col xs={3} md={2}>{IconsHelper.materialIcon("info")}<p>Wiki-Exchange</p></Col>
        <Col xs={3} md={2}>{IconsHelper.materialIcon("group")}<p>Auto-Grouping</p></Col>
        <Col xs={3} md={2}>{IconsHelper.materialIcon("event")}<p>Events & Chat</p></Col>
        </div>
        </Grid>
      </div>
    </div>
  </div>
);

export default Home;
