import React from 'react';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import * as ImagesHelper from '../../../util/images';
import * as IconsHelper from '../../../util/icons';
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

    const { uni } = this.props;

    const bSize = 60;

    return (
      <div id="header-profile">
        <IconButton id="header-uni-logo" onTouchTap={ this.openPopover.bind(this) } style={{ width: bSize, height: bSize, padding: 0 }}>
          <Avatar size={bSize} src={ UniversityHelper.getImageUrl(uni, bSize) } />
        </IconButton>

        <Popover
          open={ this.state.open }
          onRequestClose={ this.closePopover.bind(this) }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={{"horizontal":"right","vertical":"top"}}
          targetOrigin={{"horizontal":"right","vertical":"top"}}
          style={{ padding: '4px 0' }}>

          <List id="header-profile-popover">
            <ListItem leftIcon={ IconsHelper.icon("group") } primaryText="Members" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl('/members') } />
            <ListItem leftIcon={ IconsHelper.icon("person_add") } primaryText="Invite friends" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl('/invite') } />
            <Divider />
            <ListItem primaryText={ "Welcome, " + user.displayName }/>
            <ListItem leftIcon={ IconsHelper.icon("settings") } primaryText="Profile & Account" innerDivStyle={{ fontSize: 13 }} onTouchTap={ gotourl('/settings') } />
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
