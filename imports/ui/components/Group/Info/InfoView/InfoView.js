import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Markdown from 'react-markdown';
import FacebookProvider, { Like } from 'react-facebook';
import Dialog from 'share-dialog';
import { browserHistory } from 'react-router';

import * as IconsHelper from '../../../../../util/icons';
import * as InfoHelper from '../../../../../util/info';
import * as ImagesHelper from '../../../../../util/images';
import * as Colors from 'material-ui/styles/colors';

const FacebookDialog = Dialog.facebook(Meteor.settings.public.Facebook.appId, "http://app.exchangebuddy.com", "http://app.exchangebuddy.com");

export default class InfoView extends Component {
  render() {
    const { about, aboutId, sectionId, groupId, group, item } = this.props;

    const Overlay = () => (
      <CardTitle
        className="info-title"
        title={ item.section.label }
        subtitle={ InfoHelper.getSectionSubtitle(item, group) }
        style={{ zIndex: 10 }}
        titleStyle={{ lineHeight: "3rem", fontWeight: 400, fontSize:"250%", color: Colors.grey50 }}
        subtitleStyle={{ color: Colors.grey200, fontSize: "16px" }} />
    );

    return (
      <Paper className="info-text-container" zDepth={2}>

        <CardMedia
          className="info-title-container"
          mediaStyle={{ maxHeight: 500, overflow:"hidden" }}
          overlay={ <Overlay /> }>
          <img src={ InfoHelper.getImageUrl(item, 500) } />
        </CardMedia>

        <Markdown className="md-info" source={ item.content } />

        <div className="row center-md center-xs">
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton label="Edit" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.materialIcon('mode_edit')} onTouchTap={ () => browserHistory.push(`${window.location.pathname}/edit`) }/>
          </Col>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton label="Share" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.icon('fa fa-facebook-f', {color: "#FFFFFF"})} onTouchTap={ () => FacebookDialog.open() }/>
          </Col>
          <Col xs={8} md={3} className="info-container-col">
            <FacebookProvider appID={Meteor.settings.public.Facebook.appId} >
              <Like href={ Meteor.absoluteUrl(`/likes/info/${about}/${aboutId}/${sectionId}`) } colorScheme="dark" showFaces />
            </FacebookProvider>
          </Col>
        </div>

      </Paper>
    )
  }

}
