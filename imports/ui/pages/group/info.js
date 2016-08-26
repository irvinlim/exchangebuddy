import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

import InfoList from '../../components/Group/Info/InfoList';

export class GroupInfo extends React.Component {
	constructor(props, context) {
		super(props, context);
    this.state={
      xe: null,
      weather: null
    }
	}

  render(){
    const { group, university, countrySectionItems, uniSectionItems } = this.props;

    return (
      <Grid>
        <InfoList
          group={ group }
          university={ university }
          countrySectionItems={ countrySectionItems }
          uniSectionItems={ uniSectionItems } />
      </Grid>
    )
  }
}

GroupInfo.contextTypes = {
  router: PropTypes.object
};

function generateSecItems(type) {
  let res = [];
  for(let i =1; i<6; i++) {
    const x = Math.ceil(Math.ceil(Math.random()*i*10)*10)*3;
    const y = Math.ceil(Math.ceil(Math.random()*i*10)*10)*3;
    const secItem = { id: Math.floor(Math.random()*i), countryId: Math.floor(Math.random()*i), createdAt: new Date(), updatedAt: new Date(), userId: Math.floor(Math.random()*i) };
    secItem.sectionLabel= Math.ceil(Math.ceil(Math.random()*i*10)*10)*3;;
    secItem.img = 'http://lorempixel.com/'+x+'/'+y+'/city';
    secItem.type=type;
    res.push(secItem);
  }
  return res;
}

function mapStateToProps(state, ownProps) {

  let group = { id: '1', universityId: '1', year: '2', term: '3' };
  let university = { id: '10', name: 'SUTD', city: 'Singapore', logoImageId: '10', emailDomains: '10', countryId: '10', terms: '10' };
  university.country = "Singapore"; // after map or from method
  let countrySectionItems = generateSecItems('country');
  let uniSectionItems = generateSecItems('university');

  return {
    group,
    university,
    countrySectionItems,
    uniSectionItems
  };

}

export default connect(mapStateToProps)(GroupInfo);
