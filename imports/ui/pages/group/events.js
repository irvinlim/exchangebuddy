import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import EventList from '../../components/Group/Events/EventList'

const mockGroup = { id: '1', universityId: '1', year: '3', term: '2' }
const mockUni = { id: '10', name: 'SUTD', city: 'Singapore', latLng: [1.2801, 103.8509], logoImageId: '10', emailDomains: '10', countryId: '124', terms: '10' }

const GroupEvents = () => (
  <Grid>
  <Row>
    <Col xs={12} md={6}>
      <h3 className="event-title pinline"> <span>Facebook Events</span> </h3>
      <EventList source="Facebook" uni={ mockUni } group={ mockGroup } />
    </Col>
    <Col xs={12} md={6}>
      <h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
      <EventList source="Meetup" uni={ mockUni } group={ mockGroup } />
    </Col>
  </Row>
  </Grid>
);

export default GroupEvents;
