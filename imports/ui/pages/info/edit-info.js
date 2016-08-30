import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoViewEdit from '../../components/InfoView/InfoViewEdit';


const showResults = values => new Promise(resolve => {
  console.log(values)
  setTimeout(() => {  // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    resolve()
  }, 500)
})


const EditInfo = () => (
  <div className="info-container" >
  <Grid>
    <Row>
      <Col xs={12}>
      <h3 className="pinline"> <span>Edit Information Section</span> </h3>
      </Col>
    </Row>
    <Row>
      <Col xs={12} style={{marginBottom: "21px"}}>
        <InfoViewEdit onSubmit={showResults}/>
      </Col>
    </Row>
  </Grid>
  </div>
)

export default EditInfo;
