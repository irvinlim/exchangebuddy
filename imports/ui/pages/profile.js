import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper';

const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `
}

const Profile = ({ params }) => (
  <div id="welcome-header" style={landingImg}>
    <div id="logo-image" style={{paddingLeft: "4%"}}>
      { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 150, "exchangebuddy-logo") }
    </div>
    <div id="navigation-link" style={{paddingLeft: "50%", paddingTop: "4%"}}>
      <a href="www.google.com" className="link">Home</a>
      <a href="" className="link">About</a>
      <a href="" className="link">Privacy Policy</a>
    </div>

    <div style={{paddingTop: "150px"}}>
      <Grid>
        <Row>
          <Col xs={12}>
            <ProfilePaper userId={ params.userId } />
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default Profile;
