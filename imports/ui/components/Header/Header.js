import React from 'react';

const Header = ({ user }) => (
  <div id="header">
    Header! { user ? `Welcome, ${user.displayName}.` : "Please log in." }
  </div>
);

export default Header;
