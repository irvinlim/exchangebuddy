import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Loading from '../../Loading';
import EventItem from './EventItem';

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
		// TODO: query group events from fb and meetup API by location
    switch(this.props.source){
      case 'Facebook':
        Meteor.call('getGroupFbEvents', this.props.uni.countryId, (err, res)=>{
          this.setState({ groupEvents: res.events });
        })
      break;
      case 'Meetup':
        Meteor.call('getGroupMeetupEvents', this.props.uni.city, (err, res)=>{
          this.setState({ groupEvents: res.events });
        })
      break;
      default:
      break;
    }


	}

	render() {
		return (
			<div>
			{ this.state.groupEvents.length > 0 ?
				this.state.groupEvents.map( (groupEvent, idx) => ( <EventItem key={ idx } groupEvent={ groupEvent } /> ))
			: <Loading />
			}
			</div>
		)
	}
}

