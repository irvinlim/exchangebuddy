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

const infoDisplayUrlProp = ImagesHelper.getUrlScale("ikkzaet6oqkqykrarkyg",500),
          infoTitleProp = "Sample Title",
          infoInputProp = "# This is a header\n\nAnd this is a paragraph";


const validate = values => {
  const errors = {};
  const requiredFields = [ 'title', 'md-pristine' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  return errors;
}

const options = {
  toolbar: {
    /* These are the default options for the toolbar,
    if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'image', 'anchor', 'h1', 'h2', 'orderedlist', 'unorderedlist', 'quote'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    sticky: true,
    relativeContainer: null,
    buttonLabels: true
  },
  paste: {
    cleanAttrs: ['class', 'style', 'dir'],
    cleanTags: ['meta', 'span']
  },
  placeholder: {
      text: 'Information Content'
  }

};

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

  componentDidMount() {
    this.refs.title.getRenderedComponent().getRenderedComponent().focus();
  }

  handleMarkdownChange(markdown) {
    console.log(markdown);
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
        <form >
        { this.state.tile ?
          <CardMedia className="info-title-container"
            mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
            overlay={<Field
              className="form-title-field"
              component={TextField}
              fullWidth={true}
              hintText="Title of article"
              name="title"
              ref="title"
              underlineShow={false}
              defaultValue={infoTitleProp || ""}
              onBlur={ e => this.setState({title: e.target.value}) }
              withRef /> }
          >
            <div>
              <input type="file"
                accept="image/*"
                style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
                onChange={this.handleUpload.bind(this)} />
              <img src={ this.state.tile.res.secure_url } />
            </div>
          </CardMedia>
          :
          <CardMedia className="info-title-container"
            mediaStyle={{maxHeight: "500px", overflow:"hidden"}}
            overlay={<Field
              className="form-title-field"
              component={TextField}
              fullWidth={true}
              hintText="Title of article"
              name="title"
              ref="title"
              underlineShow={false}
              defaultValue={infoTitleProp || ""}
              onBlur={ e => this.setState({title: e.target.value}) }
              withRef /> }
          >
            <div>
              <input type="file"
                accept="image/*"
                style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
                onChange={this.handleUpload.bind(this)} />
              <img src={ infoDisplayUrlProp } />
            </div>
          </CardMedia>
        }

        { this.state.loadingFile && <LinearProgress mode="indeterminate" id="LinearProgressEdit"/> }

        <Col xs={12}>
          <Field name="md-pristine" component={TextField} style={{display: "none"}}/>
          <ReactMarkdownMediumEditor className="md-info" markdown={ this.state.value } options={options} onChange={this.handleMarkdownChange.bind(this)} />
        </Col>
        <div className="row center-md center-xs" style={{marginTop: "18px"}}>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton className="raised-btn" fullWidth={true} label="Submit" primary={true} type="submit" disabled={pristine || submitting} />
          </Col>
          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton className="raised-btn" fullWidth={true} label="Cancel" primary={true} disabled={pristine || submitting} onClick={reset} />
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
