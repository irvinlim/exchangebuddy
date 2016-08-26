import React from 'react';
import { Meteor } from 'meteor/meteor';

import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
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
import Signup from '../../ui/pages/signup';
import Verify from '../../ui/pages/verify';
import NotFound from '../../ui/pages/not-found';

// Info
import ViewInfo from '../../ui/pages/info/view-info';
import EditInfo from '../../ui/pages/info/edit-info';

// Group
import Group from '../../ui/pages/group/group';
import GroupHome from '../../ui/pages/group/home';
import GroupInfo from '../../ui/pages/group/info';
import GroupInfoPage from '../../ui/pages/group/info'; // temp
import GroupChat from '../../ui/pages/group/chat';
import GroupEvents from '../../ui/pages/group/events';

// Route event handlers
const combine = (handlers) => {
  return (nextState, replace) => {
    handlers.forEach(function (handler) {
      handler.call(null, nextState, replace);
    });
  };
};

const requireAuth = (nextState, replace) => {
  if (!Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const authenticatedRedirect = (nextState, replace) => {
  if (Meteor.userId()) {
    let path;
    if (Meteor.user().homeUniEmailVerified) {
      path = `/group`;
    } else {
      path = '/signup';
    }

    // Redirect user only if logged in
    replace({
      pathname: path,
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const verifiedRedirect = (nextState, replace) => {
  if (Meteor.user() && Meteor.user().homeUniEmailVerified) {
    replace({
      pathname: `/group`,
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const goToDefaultGroup = (nextState, replace) => {
  if (Meteor.user() && Meteor.user().defaultGroupId) {
    // If have default group, redirect there.
    replace({
      pathname: `/group/${Meteor.user().defaultGroupId}`,
      state: { nextPathname: nextState.location.pathname }
    });
  } else {
    // Check if have any other group; else just go to home.
    Meteor.call('User.getGroups', Meteor.userId(), (err, groups) => {
      let path;
      if (groups.length)
        path = `/group/${ groups[0].id }`;
      else
        path = '/';

      replace({
        pathname: path,
        state: { nextPathname: nextState.location.pathname }
      });
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

            <IndexRoute name="home" component={ Home } />
            <Route name="signup" path="signup" component={ Signup } onEnter={ combine([ requireAuth, verifiedRedirect ]) } />
            <Route name="verify" path="verify/:token" component={ Verify } />
            <Route path="group">
              <IndexRoute onEnter={ goToDefaultGroup } />
              <Route path=":id" component={ Group }>
                <IndexRoute name="home" component={ GroupHome } />
                <Route name="info" path="info">
                  <IndexRoute name="info-home" component={ GroupInfo } />
                  <Route path=":sectionId">
                    <IndexRoute name= "info-page" component={ ViewInfo } />
                    <Route name="info-page-edit" path="edit" component={ EditInfo } />
                  </Route>
                </Route>
                <Route name="chat" path="chat" component={ GroupChat } />
                <Route name="events" path="events" component={ GroupEvents } />
                <Redirect from="*" to="/group" />
              </Route>
            </Route>
            <Route path="404" component={ NotFound } />
            <Route path="*" component={ NotFound } />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('react-root')
    );
  });
});
