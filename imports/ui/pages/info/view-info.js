import React from 'react';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import InfoView from '../../components/InfoView/InfoView';
import FacebookProvider, { Like } from 'react-facebook';
import Dialog from 'share-dialog';
import * as IconsHelper from '../../../util/icons';

const FacebookDialog = Dialog.facebook(Meteor.settings.public.Facebook.appId, "http://exchangebuddy.irvinlim.com", "http://exchangebuddy.irvinlim.com");

const ViewInfo = () => (
  <Grid>
    <Row>
      <Col xs={12} >
        <InfoView />
      </Col>
    </Row>
    <div className="row center-xs" style={{margin: "21px 0"}}>
      <Col xs={2}>
        <RaisedButton label="Edit" primary={true} icon={IconsHelper.materialIcon('mode_edit')} onTouchTap={ () => browserHistory.push(`${window.location.pathname}/edit`) }/>
      </Col>
      <Col xs={2}>
        <RaisedButton label="Share" primary={true} icon={IconsHelper.icon('fa fa-facebook-f', {color: "#FFFFFF"})} onTouchTap={ () => FacebookDialog.open() }/>
      </Col>
      <Col xs={2}>
        <FacebookProvider appID={Meteor.settings.public.Facebook.appId} >
          <Like href="http://www.exchangebuddy.com" colorScheme="dark" showFaces />
        </FacebookProvider>
      </Col>
    </div>
  </Grid>
)

export default ViewInfo;
