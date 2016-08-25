import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Grid } from 'meteor/lifefilm:react-flexbox-grid';
import MemberList from '../../components/Group/Home/MemberList';

export class GroupHome extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

  render(){
    return (
      <Grid>
				<h3 className="pinline"><span>Whos Going</span></h3>
				<MemberList users={this.users} />
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
	let user1 = { id: '1', displayName: 'Thanh', profilePictureId: '' };
	let users = [user1];

	return users;
}

export default GroupHome;
