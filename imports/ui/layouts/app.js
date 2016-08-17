import React from 'react';
import MuiTheme from './mui-theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header';
import MessageSnackbar from '../components/MessageSnackbar';

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={ MuiTheme }>
        <div id="root-container">
          <Header />
          <div id="main">
            { this.props.children }
          </div>

          <MessageSnackbar />
        </div>
      </MuiThemeProvider>
    );
  },
});

export default App;
