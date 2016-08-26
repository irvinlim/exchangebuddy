import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
// import {  } from '../../../client/actions/';

// Component
import ChildComponent from './InfoView';

// redux
// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: bindActionCreators({ }, dispatch),
//   };
// };

// const InfoView = connect(null, mapDispatchToProps)(ChildComponent);

export default ChildComponent;
