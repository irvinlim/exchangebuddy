import React from 'react';
import { handleLogout } from '../../../util/session';

const Welcome = ({ user }) => {
  if (user)
    return <div>{ `Welcome, ${user.displayName}.` }</div>;
  else
    return <div>Please log in.</div>;
};

const Logout = ({ user, showSnackbar }) => {
  const handle = () => handleLogout(function() {
    showSnackbar()
  });

  if (user)
    return <a role="button" onTouchTap={ handle }>Logout</a>;
  else
    return null;
};

const Header = ({ user, actions }) => {
  return (
    <div id="header">
      <Welcome user={user} /> <Logout user={user} showSnackbar={ () => actions.showSnackbar("Logged out.") } />
    </div>
  );
};

export default Header;
