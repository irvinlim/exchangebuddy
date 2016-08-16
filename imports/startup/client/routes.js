import React from 'react';
import { Meteor } from 'meteor/meteor';

import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Store from './redux-store';

// Helpers
import { logPageView } from '../../util/analytics';
import { setCurrentUser } from '../../util/session';

/** ROUTES **/

// Layout
import App from '../../ui/layouts/app';

// Pages
import Home from '../../ui/pages/home';
import NotFound from '../../ui/pages/not-found';


// Route event handlers
const requireAuth = (nextState, replace) => {
  if (!Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const authenticatedRedirect = (nextState, replace) => {
  if (Meteor.userId()) {
    let path;
    if (Meteor.user().homeUniEmailVerified) {
      path = 'group';
    } else {
      path = 'signup';
    }

    // Redirect user only if logged in
    replace({
      pathname: path,
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, Store);

// Return root element for rendering.
Meteor.startup(() => {
  // Set current user to Meteor variable
  setCurrentUser((isUserSet) => {
    // Continue with rendering
    render(
      <Provider store={ Store }>
        <Router history={ history } onUpdate={ logPageView }>
          <Route path="/" component={ App }>
            <IndexRoute name="home" component={ Home } onEnter={ authenticatedRedirect } />
            <Route path="*" component={ NotFound } />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('react-root')
    );
  });
});
