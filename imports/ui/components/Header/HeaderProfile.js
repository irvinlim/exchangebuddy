import React from 'react';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
import * as UserHelper from '../../../util/user';
import * as UniversityHelper from '../../../util/university';
import { FullWidthAvatar } from '../../../util/avatar';
import { handleLogout } from '../../../util/session';

export default class HeaderProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Reset popover state on login/logout.
    if (prevProps.user != this.props.user)
      this.setState({ open: false });
  }

  openPopover(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  closePopover(event) {
    this.setState({ open: false });
  }

  showProfileButton(user) {
    const gotourl = (url) => () => browserHistory.push(url);
    const handle = () => handleLogout( () => this.props.actions.showSnackbar("Logged out."));

    const { uni, group } = this.props;

    const bSize = 60;
    const cSize = 60;


    return (
      <div id="header-profile">
        <IconButton id="header-logo" onTouchTap={ this.openPopover.bind(this) } style={{ width: bSize, height: bSize, padding: 0 }}>
          { UniversityHelper.getImage(uni, bSize) }
        </IconButton>

        <Popover
          open={ this.state.open }
          onRequestClose={ this.closePopover.bind(this) }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={{"horizontal":"right","vertical":"top"}}
          targetOrigin={{"horizontal":"right","vertical":"top"}}
          style={{ padding: '4px 0', maxWidth: 300 }}>

          <List>
            <ListItem
              innerDivStyle={{ lineHeight: "18px", height: 60, paddingLeft: 90, paddingTop: 12 }}
              leftAvatar={ UniversityHelper.getImage(uni, cSize) }
              primaryText={ <strong>{ uni.name }</strong> }
              secondaryText={ `${group.term} ${group.year}` }
              onTouchTap={ gotourl(`/group/${group.id}`) } />
            <ListItem leftIcon={ IconsHelper.icon("people") } primaryText="Group Members" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl(`/group/${group.id}`) } />
            <ListItem leftIcon={ IconsHelper.icon("info") } primaryText="Exchange Info" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl(`/group/${group.id}/info`) } />
            <ListItem leftIcon={ IconsHelper.icon("chat") } primaryText="Group Chat" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl(`/group/${group.id}/chat`) } />
            <ListItem leftIcon={ IconsHelper.icon("event") } primaryText="Events" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl(`/group/${group.id}/event`) } />
            <ListItem leftIcon={ IconsHelper.icon("subdirectory_arrow_right") } primaryText="Switch group" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl('/invite') } />

            <Divider />

            <ListItem
              innerDivStyle={{ lineHeight: "20px", height: 60, paddingLeft: 90, paddingTop: 16 }}
              leftAvatar={ UserHelper.getAvatar(user, cSize) }
              primaryText={ <strong>{ user.displayName }</strong> }
              secondaryText={ user.homeUniversity.name }
              onTouchTap={ gotourl(`/profile`) } />
            <ListItem leftIcon={ IconsHelper.icon("person") } primaryText="Profile" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl('/profile') } />
            <ListItem leftIcon={ IconsHelper.icon("exit_to_app") } primaryText="Log Out" innerDivStyle={{ fontSize: 13 }} onTouchTap={ handle } />
          </List>

        </Popover>
      </div>
    );
  }

  render() {
    return this.props.user ? this.showProfileButton(this.props.user) : null;
  }
}
