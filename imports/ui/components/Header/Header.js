import React from 'react';
import { handleLogout } from '../../../util/session';

const logout = () => handleLogout(() => {

});

const Welcome = ({ user }) => {
  if (user)
    return <div>{ `Welcome, ${user.displayName}.` }</div>;
  else
    return <div>Please log in.</div>;
};

const Logout = ({ user }) => {
  if (user)
    return <a role="button" onTouchTap={ logout }>Logout</a>;
  else
    return null;
};

const Header = ({ user }) => (
  <div id="header">
    <Welcome user={user} /> <Logout user={user} />
  </div>
);

export default Header;
