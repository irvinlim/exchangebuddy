import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoViewEdit from '../../components/InfoView/InfoViewEdit';

const EditInfo = () => (
      <Grid>
        <Row>
          <Col xs={12}>
          <h3 className="pinline"> <span>Edit Information Section</span> </h3>
          </Col>
        </Row>
        <InfoViewEdit />
      </Grid>
    )

export default EditInfo;
