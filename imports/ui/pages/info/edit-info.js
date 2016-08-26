import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';
import InfoViewEdit from '../../components/InfoView/InfoViewEdit';

const EditInfo = () => (
      <Grid>
        <div>Information Section Display</div>
        <InfoViewEdit />
      </Grid>
    )

export default EditInfo;
