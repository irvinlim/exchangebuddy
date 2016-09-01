import React from 'react';
import LoginButton from '../components/LoginButton';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

const landingContainerStyle = {
  backgroundColor: "darkslategray",
}

const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `,
}

const Home = () => (
  <div id="landing-container" style={landingContainerStyle}>
    <div id="welcome-header" style={landingImg}>

      <div id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 150, "exchangebuddy-logo") }
      </div>

      <div id="welcome-main-container">
        <div id="welcome-header-title">
          <h2 id="app-title">Find out who else is on an adventure</h2>
          <p className="app-subtitle">Find your travel buddies! Share tips for the trip, by students, for students.</p>
          <p className="app-subtitle">Forget the messy Facebook groups and Google forms, all you need is right here.</p>
        </div>

        <div id="login-button"><LoginButton /></div>

        <div id="feature-list">
          <Grid>
            <div className="row center-xs center-md feature-row">
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("info")}<p>Information Wiki</p></Col>
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("group")}<p>Group Chat</p></Col>
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("event")}<p>Event Listing</p></Col>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
