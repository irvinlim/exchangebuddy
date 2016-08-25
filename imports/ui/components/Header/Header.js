import React from 'react';
import { browserHistory } from 'react-router';
import { handleLogout } from '../../../util/session';
import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import HeaderProfile from './HeaderProfile';

const gotourl = (groupId, tab) => () => {
  const queryParams = ['group', groupId];

  if (tab)
    queryParams.push(tab);

  browserHistory.push('/' + queryParams.join('/'));
};

const tabToIdx = tab => {
  switch(tab){
    case 'home':
      return 0;
    case 'info':
      return 1;
    case 'chat':
      return 2;
    case 'events':
      return 3;
    default:
      return 0;
  }
}

const Header = ({ user, uni, group, actions, params, tab }) => (
  <div
    id="header"
    style={{
      background: `linear-gradient(to bottom, rgba(25,25,25,0.72) 0%,rgba(0,0,0,0.93) 100%),
        url(${ImagesHelper.getUrlScale(uni.bgImageId, $(window).width())}) center center / cover no-repeat`,
      backgroundColor: "#000000",
    }}>


    <Grid>
      <Row id="header-row">

        <Col xs={6} md={2} id="logo-image">
          { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 95, "exchangebuddy-logo") }
        </Col>

        <Col xs={12} md={8} id="header-title">
          <h2 id="uni-name">{ uni.name }</h2>
          <p id="uni-description">{ `${ group.term } ${ group.year } - ${ group.size } Members` }</p>
        </Col>

        <Col xs={6} md={2}>
          <HeaderProfile user={ user } uni={ uni } actions={ actions } />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8} mdOffset={2} id="header-tab-row">
        <Tabs inkBarStyle={{backgroundColor: "#fff"}} initialSelectedIndex={ tabToIdx(tab) } >
          <Tab icon={IconsHelper.materialIcon("home")} label="HOME" className="header-tab" onActive={ gotourl(params.id) } />
          <Tab icon={IconsHelper.materialIcon("info")} label="INFO" className="header-tab" onActive={ gotourl(params.id, "info") } />
          <Tab icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } />
          <Tab icon={IconsHelper.materialIcon("event")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events") } />
        </Tabs>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Header;
