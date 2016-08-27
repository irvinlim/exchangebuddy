import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Loading from '../../../Loading';
import RaisedButton from 'material-ui/RaisedButton';

import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    };
  }

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

    const showAllEvents = () => this.setState({ showAll: true });

    // Before button is clicked, only show 5 events
    const end = this.state.showAll ? groupEvents.length : 5;

		return (
			<div className="event-list">
        { groupEvents.slice(0, end).map((groupEvent, idx) => <EventItem key={ idx } source={ source } groupEvent={ groupEvent } /> ) }

        <Row>
          <Col xs={12}>
            { this.state.showAll ? null
              : <RaisedButton label="Show all events" primary={true} style={{ display: "block" }} onTouchTap={ showAllEvents } /> }
          </Col>
        </Row>
			</div>
		);
	}
}

