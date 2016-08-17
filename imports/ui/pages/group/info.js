import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfoList from '../../components/Group/InfoList';

export class GroupInfo extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

  render(){
    return (
      <InfoList
        group={this.props.groups}
        university={this.props.university}
        countrySectionItems={this.props.countrySectionItems}
        uniSectionItems={this.props.uniSectionItems} />
    )
  }
}

// // Use like `this.props.actions.removeInfo`
// GroupInfo.propTypes = {
//   actions: PropTypes.object.isRequired
// };

GroupInfo.contextTypes = {
  router: PropTypes.object
};

function getGroupById(groups, id) {
  const group = groups.filter(group => group.id == id);
  if (group) return group[0]; //since filter returns an array, have to grab the first.
  return null;
}

function generateSecItems(type) {
  let res = [];
  switch(type){
    case 'country':
      for(let i =0; i<5; i++) {
          const secItem = {countrySectionId: i, countryId: type + i, content: type, createdAt: i, updatedAt: i, userId: i};
          res.push(secItem);
      }
    break;
    case 'uni':
      for(let i =0; i<5; i++) {
          const secItem = {uniSectionId: i, universities_id: type + i, content: i, createdAt: i, updatedAt: i, editUserId: i};
          res.push(secItem);
      }
    break;
    default:
    break;
  }
  return res;
}

function mapStateToProps(state, ownProps) {
  const groupId = ownProps.params.id; // from the path `/group/:id`

  let group = { id: '1', universityId: '1', year: '2', term: '3' };
  let university = { id: '', name: '', city: '', logoImageId: '', emailDomains: '', countryId: '', terms: '' };
  let countrySectionItems = generateSecItems('country');
  let uniSectionItems = generateSecItems('uni');

  // if (groupId && state.groups.length > 0) {
  //   group = getGroupById(state.groups, groupId);
  // }
  console.log(uniSectionItems)
  return {
    group,
    university,
    countrySectionItems,
    uniSectionItems
  };

}


// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(groupActions, dispatch)
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);

export default connect(mapStateToProps)(GroupInfo);
