import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const querystring = require('querystring');

const makeOpenShareDialog = group => event => {
  const appId = Meteor.settings.public.Facebook.appId;
  const description = `I'll be going on exchange to ${group.university.name} in ${group.term} ${group.year}! Join me on ExchangeBuddy if you are going as well!`;
  const title = `ExchangeBuddy: Find your exchange buddies!`;
  const link = Meteor.absoluteUrl(`/group/${group.id}`);

  const qs = querystring.stringify({
    app_id: appId,
    link,
    description,
    title,
  });

  const href = `https://www.facebook.com/dialog/feed?${qs}`;
  window.open(href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=320')
};

const FacebookShare = ({ group }) => (
  <RaisedButton primary={true} label="Share on Facebook" onTouchTap={ makeOpenShareDialog(group) } />
);

export default FacebookShare;
