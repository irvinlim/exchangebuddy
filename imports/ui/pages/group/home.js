import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

export default class GroupHome extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

  render(){
    return (
      <Grid>
        <div>Home</div>
      </Grid>
    )
  }
}
