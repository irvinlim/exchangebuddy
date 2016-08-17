import React from 'react';
import { browserHistory } from 'react-router';

import FacebookLogin from 'react-facebook-login';
import { setUserSession } from '../../../util/session';

const responseFacebook = (actions) => (response) => {
  if (!response || !response.userID)
    return;

  Meteor.call('loginFacebook', response, (error, { user, token }) => {
    if (error || !user || !token) {
      if (error)
        console.log("Error in invoking loginFacebook: " + error);

      actions.showSnackbar("Could not login to Facebook.");
    } else {
      setUserSession(user, token);
      browserHistory.push('/signup');

      // Temp
      actions.showSnackbar("Logged in!");
    }
  });
};

const LoginButton = ({ actions }) => (
  <FacebookLogin
    appId={ Meteor.settings.public.Facebook.appId }
    fields="name,email,picture,gender"
    callback={ responseFacebook(actions) } />
);

export default LoginButton;
