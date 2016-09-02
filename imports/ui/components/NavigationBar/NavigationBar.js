import React from 'react';
import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Link from '../Link';

const NavigationBar = () => (
  <Grid id="navigation-bar">
    <Row>
      <Col xs={6} id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 150, "exchangebuddy-logo") }
      </Col>

      <Col xs={6} id="navigation-links">
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </Col>
    </Row>
  </Grid>
)

export default NavigationBar;
