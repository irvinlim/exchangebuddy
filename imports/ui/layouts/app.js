import React from 'react';
import MuiTheme from './mui-theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header';
import MessageSnackbar from '../components/MessageSnackbar';

// Component

class App extends React.Component {
  componentDidMount() {
    // Declare window resize handlers
    this.windowResizeHandlers = [
      (e) => {
        console.log('resize');
        console.log(this.props.actions.resizeBrowserWindow);
      },
    ];

    this.windowResizeHandlers.forEach(handler => $(window).on('resize', handler).trigger('resize'));
  }

  componentWillUnmount() {
    this.windowResizeHandlers.forEach(handler => $(window).off('resize', handler));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ MuiTheme }>
        <div id="root-container">
          <div id="main">
            { this.props.children }
          </div>

          <MessageSnackbar />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from '../../client/actions/browser';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ resizeBrowserWindow }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(App);
