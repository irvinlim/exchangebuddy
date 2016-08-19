import React from 'react';
import LoginButton from '../components/LoginButton';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

const welcomeStyle = { height: $(window).height(), backgroundColor: "darkslategray" }

const Home = () => (
  <div className="text-center" style={welcomeStyle}>
    <div id="welcome-header">

      <div id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 99, "exchangebuddy-logo") }
      </div>

      <Grid>
        <Row>
          <Col xs={0} md={2}></Col>
          <Col xs={12} md={8} id="welcome-header-title">
            <h2 id="app-name">Exchange Buddy</h2>
            <p id="app-description">Find other exchange students like yourself</p>
          </Col>
        </Row>
      </Grid>
    </div>

    <div id="welcome-body">
      <div id="welcome-body-message">Share tips,</div>
      <div id="welcome-body-message">chat about adventures,</div>
      <div id="welcome-body-message">stay updated with the latest news.</div>
    </div>
    <div id="login-button">
      <LoginButton />
    </div>
  </div>
);

export default Home;
