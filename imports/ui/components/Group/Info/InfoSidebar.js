import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import ExchangeRateCard from '../../Card/ExchangeRate';
import WeatherCard from '../../Card/Weather';

const InfoSidebar = ({ university }) => (
  <Row>
    <Col xs={12} style={{paddingBottom: "12px"}}>
      <ExchangeRateCard city={ university.city } />
    </Col>
    <Col xs={12} style={{paddingBottom: "12px"}}>
      <WeatherCard city={ university.city } />
    </Col>
  </Row>
)


export default InfoSidebar;
