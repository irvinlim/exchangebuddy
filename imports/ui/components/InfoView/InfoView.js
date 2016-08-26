import React, {Component, PropTypes} from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import * as ImagesHelper from '../../../util/images';
import Markdown from 'react-markdown';

const infoDisplayUrl = ImagesHelper.getUrl("uhllazfghy8htamwjk8d"),
          infoTitle = "Sample Title",
          infoInput = "# This is a header\n\nAnd this is a paragraph";

export default class InfoView extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "Plain text"
    }

  }

  render() {

    return (
      <Paper className="mdEditorPaper" zDepth={2}>
      <Grid>
        View Info
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <Row>
          <Col xs={1} />
          <Col xs={10}>
            <GridList cellHeight={300} cols={1} style={{ width: '100%', height: 'auto', overflowY: 'auto', marginBottom: 24, paddingLeft:"15px", paddingRight:"15px"}} >
              <GridTile key={infoDisplayUrl} title={infoTitle} cols={1} >
                <img src={infoDisplayUrl} />
              </GridTile>
            </GridList>
          </Col>
          </Row>
        </div>

        <Markdown source={infoInput} />

        <Row>
          <Col xs={12} style={{marginTop: "18px"}}>
            <RaisedButton label="Edit" primary={true} />
            <RaisedButton label="Share" primary={true} />
            <RaisedButton label="Like" primary={true} />
          </Col>
        </Row>
      </Grid>
      </Paper>
    )
  }

}
