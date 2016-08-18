import React from 'react';
import { handleLogout } from '../../../util/session';
import * as ImagesHelper from '../../../util/images';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import HeaderProfile from './HeaderProfile';

const Header = ({ user, uni, actions }) => (
  <div id="header">
    <div id="logo-image">
      { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 99, "exchangebuddy-logo") }
    </div>
    <div id="header-title">
      <div id="group-title">{ uni.name }</div>
      <div id="group-period-members">{ `${ uni.terms } - ${ uni.emailDomains }` }</div>
    </div>
    <HeaderProfile
      user={ user }
      uni={ uni }
      showSnackbar={ () => actions.showSnackbar("Logged out.") } />
  </div>
);

export default Header;
