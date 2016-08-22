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
		this.setState({
			groupEvents: [{
				title:'a',
				description: 'description',
				link:"http://google.com"
			},{
				title:'b',
				description: 'description',
				link:"http://google.com"
			},{
				title:'c',
				description: 'description',
				link:"http://google.com"
			},]
		})
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

