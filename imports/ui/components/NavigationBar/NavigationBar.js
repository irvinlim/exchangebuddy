import React from 'react';
import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';

const labelStyle = {
  fontSize: "larger",
  color: "white",
  fontWeight: 500
};

const buttonStyle = {
  paddingRight: "6%"
};

const NavigationBar = () => (
  <div id="navigation-bar">
    <div id="logo-image" style={{paddingLeft: "4%"}}>
      { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 150, "exchangebuddy-logo") }
    </div>
    <div id="navigation-link" style={{paddingLeft: "50%", paddingTop: "4%"}}>
      <FlatButton href="" label="Home" labelStyle={labelStyle} style={buttonStyle} />
      <FlatButton href="about" label="About" labelStyle={labelStyle} style={buttonStyle} />
      <FlatButton href="privacy-policy" label="Privacy Policy" labelStyle={labelStyle} style={buttonStyle} />
    </div>
  </div>
)

export default NavigationBar;
