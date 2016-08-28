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
      <Paper className="md-info" zDepth={2}>

    <Row center="xs">
      <Col xs={6}>testin</Col>
    </Row>
          <CardMedia
            mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
            overlay={<CardTitle title={infoTitle} subtitle={`Updated at: ${lastUpdated}`} />}
          >
            <img src={infoDisplayUrl} />
          </CardMedia>

          <Markdown source={infoInput} />

      </Paper>
    )
  }

}
