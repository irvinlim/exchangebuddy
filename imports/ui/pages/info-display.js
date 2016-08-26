import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';
import InfoView from '../components/InfoView/InfoView';

const InfoDisplay = () => (
      <Grid>
        <div>Information Section Display</div>
        <InfoView />
      </Grid>
    )

export default InfoDisplay
