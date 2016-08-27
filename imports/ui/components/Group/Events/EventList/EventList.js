import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Loading from '../../../Loading';
import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';

export default class EventsList extends React.Component {
	render() {
    const { groupEvents, source } = this.props;

    const EventItem = ({ source, groupEvent }) => {
      if (source == 'Facebook')
        return <EventItemFb groupEvent={ groupEvent } />;
      else if (source == 'Meetup')
        return <EventItemMu groupEvent={ groupEvent } />;
      else
        return null;
    };

		return (
			<div style={{ height: $(window).height(), overflowY: "auto", overflowX: "hidden" }}>
        { groupEvents.map((groupEvent, idx) => <EventItem key={ idx } source={ source } groupEvent={ groupEvent } /> ) }
			</div>
		);
	}
}

