import React from 'react';
import { browserHistory } from 'react-router';
import { handleLogout } from '../../../util/session';
import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import HeaderProfile from './HeaderProfile';

const gotourl = (url) => () => browserHistory.push(url);

const Header = ({ user, uni, group, actions }) => (
  <div id="header" style={{
    backgroundImage: `linear-gradient(to bottom, rgba(25,25,25,0.72) 0%,rgba(0,0,0,0.93) 100%),
      url(${ImagesHelper.getUrlScale(uni.bgImageId, $(window).width())})`,
    backgroundSize: "cover" }}>

    <div id="logo-image">
      { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 99, "exchangebuddy-logo") }
    </div>

    <Grid>
      <Row>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8} id="header-title">
          <h2 id="uni-name">{ uni.name }</h2>
          <p id="uni-description">{ `${ uni.terms } - ${ group.size } Members` }</p>
        </Col>
      </Row>

      <Row>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8} id="header-tab-row">
        <Tabs inkBarStyle={{backgroundColor: "#fff"}}>
          <Tab icon={IconsHelper.materialIcon("info")} label="INFO" className="header-tab" onActive={ gotourl('/group/info') } />
          <Tab icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl('/group/chat') } />
          <Tab icon={IconsHelper.materialIcon("event")} label="EVENTS" className="header-tab" onActive={ gotourl('/group/events') } />
        </Tabs>
        </Col>
      </Row>
    </Grid>

    <HeaderProfile
      user={ user }
      uni={ uni }
      showSnackbar={ () => actions.showSnackbar("Logged out.") } />
  </div>
);

export default Header;
