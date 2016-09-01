import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import SignupStepper from '../components/SignupStepper';
import * as ImagesHelper from '../../util/images';

const Signup = () => (
  <Row>
    <Col md={6} xs={0}>
      <img src={ImagesHelper.getUrlScale(Meteor.settings.public.stepperImageId, 500)} id="stepper-img"/>
    </Col>
    <Col md={5} xs={12} style={{padding: "30px"}}>
      <h1>Complete your profile</h1>
      <SignupStepper />
    </Col>
  </Row>
);

export default Signup;
