import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper/ProfilePaper.js';

const welcomeStyle = { height: $(window).height(), backgroundColor: "darkslategray" }

const Profile = () => (
  <div className="text-center" style={welcomeStyle}>
    <div id="welcome-header">

      <div id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 99, "exchangebuddy-logo") }
      </div>

      <Grid>
        <Row>
          <Col xs={0} md={1}></Col>
          <Col xs={12} md={10} id="welcome-header-title">
            <ProfilePaper />
          </Col>
        </Row>
      </Grid>
    </div>

  </div>
);

export default Profile;
