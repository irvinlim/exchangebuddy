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
import * as IconsHelper from '../../../util/icons';
import * as ImagesHelper from '../../../util/images';

const FacebookDialog = Dialog.facebook(Meteor.settings.public.Facebook.appId, "http://app.exchangebuddy.com", "http://app.exchangebuddy.com");

const infoDisplayUrl = ImagesHelper.getUrlScale("ikkzaet6oqkqykrarkyg",500),
          infoTitle = "Sample Title",
          infoInput = "# This is a header\n\nAnd this is a paragraph",
          lastUpdated = moment().format("MMM Do YYYY");

export default class InfoView extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "Plain text"
    }

  }

  render() {

    return (
      <Paper zDepth={2} style={{margin: "21px 0"}}>

        <CardMedia className="info-title-container"
          mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
          overlay={<CardTitle titleStyle={{lineHeight: "3rem",fontWeight: "400", fontSize:"250%"}} title={infoTitle}
            subtitleStyle={{fontWeight: "100"}} subtitle={`Updated at: ${lastUpdated}`} />}
        >
          <img src={infoDisplayUrl} />
        </CardMedia>

        <Markdown className="md-info" source={infoInput} />

        <div className="row center-xs" >
          <Col xs={3} >
            <RaisedButton label="Edit" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.materialIcon('mode_edit')} onTouchTap={ () => browserHistory.push(`${window.location.pathname}/edit`) }/>
          </Col>
          <Col xs={3}>
            <RaisedButton label="Share" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.icon('fa fa-facebook-f', {color: "#FFFFFF"})} onTouchTap={ () => FacebookDialog.open() }/>
          </Col>
          <Col xs={3} style={{margin: "21px 0"}}>
            <FacebookProvider appID={Meteor.settings.public.Facebook.appId} >
              <Like href="http://www.exchangebuddy.com" colorScheme="dark" showFaces />
            </FacebookProvider>
          </Col>
        </div>

      </Paper>
    )
  }

}
