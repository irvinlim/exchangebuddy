import React from 'react';
import { browserHistory } from 'react-router';

import Snackbar from 'material-ui/Snackbar';
import FacebookLogin from 'react-facebook-login';
import { setUserSession } from '../../../util/session';

const responseFacebook = (self) => (response) => {
  if (!response || !response.userID)
    return;

  Meteor.call('loginFacebook', response, (error, { user, token }) => {
    if (error || !user || !token) {
      if (error)
        console.log("Error in invoking loginFacebook: " + error);

      self.setState({ snackbarOpen: true });
    } else {
      setUserSession(user.id, token);
      browserHistory.push('/signup');
    }
  });
};

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false
    };
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId={ Meteor.settings.public.Facebook.appId }
          fields="name,email,picture,gender"
          callback={ responseFacebook(this) } />

        <Snackbar
          open={ this.state.snackbarOpen }
          message="Could not log in to Facebook."
          autoHideDuration={2000}
          onRequestClose={ () => this.setState({ snackbarOpen: false }) } />
      </div>
    );
  }
}
