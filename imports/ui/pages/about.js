import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale('exchangebuddy/norway', 900)}) no-repeat center center `
}

const About = ({ params }) => (
  <div id="welcome-header" style={landingImg}>
    <NavigationBar />

    <div style={{paddingTop: "150px", paddingBottom: "30px"}}>
      <Grid>
        <Row>
          <Col xs={12}>
            <Paper style={{padding: "5%"}}>
              <h1>About Exchange Buddy</h1>
              <p><strong>Exchange Buddy</strong> provides a platform for exchange students to find friends, information and events at the exchange university easily and quickly even before you travel.</p>
              <p>The application is developed by four students, <strong>Irvin Lim, Leon Mak, Eugene Ng and Lam Chi Thanh</strong> as a school project for module CS3216 (School of Computing, NUS).</p>
            </Paper>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default About;
