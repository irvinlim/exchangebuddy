import React, {Component, PropTypes} from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as ImagesHelper from '../../../util/images';
import Markdown from 'react-markdown';

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
      <Paper zDepth={2}>

          <CardMedia className="info-title-container"
            mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
            overlay={<CardTitle titleStyle={{lineHeight: "3rem",fontWeight: "400", fontSize:"250%"}} title={infoTitle}
              subtitleStyle={{fontWeight: "100"}} subtitle={`Updated at: ${lastUpdated}`} />}
          >
            <img src={infoDisplayUrl} />
          </CardMedia>

          <Markdown className="md-info" source={infoInput} />

      </Paper>
    )
  }

}
