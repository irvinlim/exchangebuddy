import React, {Component, PropTypes} from 'react';
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import * as IconsHelper from '../../../util/icons';
import * as ImagesHelper from '../../../util/images';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MarkdownTextField from './MarkdownTextField';

const infoDisplayUrlProp = ImagesHelper.getUrlScale("ikkzaet6oqkqykrarkyg",500),
          infoTitleProp = "Sample Title",
          infoInputProp = "# This is a header\n\nAnd this is a paragraph",
          lastUpdated = moment().format("MMM Do YYYY");

const validate = values => {
  const errors = {};
  const requiredFields = [ 'markdown' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  return errors;
}

class InfoViewEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "# Markdown finally",
      loading: false,
      tile: null,
      title: "Some Title"
    }
  }

  handleMarkdownChange(markdown) {
    console.log(markdown);
    this.setState({value: markdown})
    return markdown;
  }

  handleUpload(e) {
    const self = this;
    const files = e.currentTarget.files;
    let tile = {};
    tile.files= files;

    this.setState({ loadingFile: true });

    // upload files to root cloudinary folder
    Cloudinary.upload(files, {}, function(err, res) {
      tile.res=res;
      self.setState({ tile: tile});
      self.setState({ loadingFile : false})
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <Paper className="info-text-container" zDepth={2}>
          <CardMedia className="info-title-container"
            mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
            overlay={<CardTitle className="info-title" titleStyle={{lineHeight: "3rem",fontWeight: "400", fontSize:"250%"}} title={infoTitleProp}
              subtitleStyle={{fontWeight: "100"}} subtitle={`Updated at: ${lastUpdated}`} />}
          >
          { this.state.tile ?
          <div>
            <input type="file"
              accept="image/*"
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
              onChange={this.handleUpload.bind(this)} />
            <img src={ this.state.tile.res.secure_url } />
          </div>
          :
          <div>
            <input type="file"
              accept="image/*"
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
              onChange={this.handleUpload.bind(this)} />
            <img src={ infoDisplayUrlProp } />
          </div>
          }
          </CardMedia>

        { this.state.loadingFile && <LinearProgress mode="indeterminate" id="LinearProgressEdit"/> }
        <form onSubmit={handleSubmit}>
          <Col xs={12}>
            <Field name="markdown" component={MarkdownTextField} markdown={infoInputProp} />
          </Col>
          <div className="row center-md center-xs" style={{marginTop: "18px"}}>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Submit" primary={true} disabled={ pristine || submitting } type="submit"  />
            </Col>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Cancel" primary={true} disabled={ pristine || submitting } onClick={reset} />
            </Col>
          </div>
        </form>
      </Paper>
    )
  }
}
export default reduxForm({
  form: 'InfoEditForm',
  validate
})(InfoViewEdit);
