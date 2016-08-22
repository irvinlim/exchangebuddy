import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Loading from '../../Loading';
import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';

export default class EventsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uni: this.props.uni,
			group: this.props.group,
			groupEvents: []
		}
	}

	componentDidMount() {
		// Search assuming uni has latlng info
    switch(this.props.source){
      case 'Facebook':
        Meteor.call('getGroupFbEvents', this.props.uni.latLng, (err, res)=>{
          this.setState({ groupEvents: res.events });
        })
      break;
      case 'Meetup':
        Meteor.call('getGroupMuEvents', this.props.uni.latLng, this.props.uni.city, (err, res) => {
          this.setState({ groupEvents: res.results });
        });
      break;
      default:
      break;
    }


	}

	render() {
		return (
			<div>
			{ this.state.groupEvents.length > 0 ?
        this.props.source == "Facebook" ?
				  this.state.groupEvents.map( (groupEvent, idx) => ( <EventItemFb key={ idx } groupEvent={ groupEvent } /> ))
        :
        this.props.source == "Meetup" ?
          this.state.groupEvents.map( (groupEvent, idx) => ( <EventItemMu key={ idx } groupEvent={ groupEvent } /> ))
        :
        <div />
			: <Loading />
			}
			</div>
		)
	}
}

