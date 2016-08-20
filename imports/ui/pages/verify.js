import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';

import Loading from '../components/Loading';
import Link from '../components/Link';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../client/actions/snackbar';

class Verify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyFail: false
    };
  }

  componentDidMount() {
    const self = this;

    Meteor.call('verifyEmailToken', this.props.params.token, (err, result) => {
      if (err || !result) {
        self.setState({ verifyFail: true });
      } else {
        browserHistory.push('/group');
        this.props.actions.showSnackbar("Email successfully verified.");
      }
    });
  }

  render() {
    if (!this.state.verifyFail)
      return <Loading />;
    else
      return (
        <Grid>
          <h1>Email verification failed</h1>
          <p>Click <Link to="/signup">here</Link> to resend your verification email.</p>
        </Grid>
      );
  }
}

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Verify);
