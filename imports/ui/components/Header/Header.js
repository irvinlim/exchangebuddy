import React from 'react';
import { browserHistory } from 'react-router';
import { handleLogout } from '../../../util/session';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import { Tabs, Tab } from 'material-ui/Tabs';

import HeaderProfile from './HeaderProfile';

import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import { pluralizer } from '../../../util/helper';

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

const eventHandleScroll = (event) => {
  if ($(window).width() < 768)
    return;

  // Disable sticky header
  return;

  // This JavaScript to make the header collapse into small sticky header when scroll
  if ($(this).scrollTop() > 100) {
    $('#header').addClass("sticky");
    $('#header-title').addClass("sticky");
    $('#header-profile').addClass("sticky");
    $('#header-uni-logo').addClass("sticky");
  } else {
    $('#header').removeClass("sticky");
    $('#header-title').removeClass("sticky");
    $('#header-profile').removeClass("sticky");
    $('#header-uni-logo').removeClass("sticky");
  }
};

export default class Header extends React.Component {
  componentDidMount() {
    $(window).on('scroll', eventHandleScroll);
  }

  componentWillUnmount() {
    $(window).off('scroll', eventHandleScroll);
  }

  render() {
    const { user, uni, group, actions, params, tab } = this.props;

    return (
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
              { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 180, "exchangebuddy-logo") }
            </Col>

            <Col xs={12} md={8} id="header-title">
              <h2 id="uni-name">{ uni.name }</h2>
              <p id="uni-description">{ `${ group.term } ${ group.year } - ${ group.users.length } ${ pluralizer(group.users.length, 'Member', 'Members') }` }</p>
            </Col>

            <Col xs={6} md={2}>
              <HeaderProfile user={ user } uni={ uni } actions={ actions } />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div className="row center-xs center-md" id="header-tab-row">
            <Col xs={12} md={8} id="header-tab-col">
            <Tabs inkBarStyle={{backgroundColor: "#fff"}} initialSelectedIndex={ tabToIdx(tab) } >
              <Tab icon={IconsHelper.materialIcon("home")} label="HOME" className="header-tab" onActive={ gotourl(params.id) } />
              <Tab icon={IconsHelper.materialIcon("info")} label="INFO" className="header-tab" onActive={ gotourl(params.id, "info") } />
              <Tab icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } />
              <Tab icon={IconsHelper.materialIcon("event")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events") } />
            </Tabs>
            </Col>
          </div>
        </Grid>
      </div>
    );
  }
}
