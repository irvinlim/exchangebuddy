import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale('exchangebuddy/norway', 900)}) no-repeat center top `
}

const Profile = ({ params }) => (
  <div id="welcome-header" style={landingImg}>
    <NavigationBar />

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
