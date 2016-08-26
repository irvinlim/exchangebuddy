import React, {Component, PropTypes} from 'react';
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import * as IconsHelper from '../../../util/icons';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { GridList, GridTile } from 'material-ui/GridList';


const validate = values => {
  const errors = {};
  const requiredFields = [ 'title' ];
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
    buttons: ['bold', 'italic', 'underline', 'anchor', 'image', 'h1', 'h2', 'h3', 'h4', 'orderedlist', 'unorderedlist', 'indent', 'outdent', 'quote', 'pre'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    static: false,
    relativeContainer: null,
    buttonLabels: true
  },
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
      <Grid>
      <form >

        <Row>
          <Col xs={12} md={6}>
            <h1>Title</h1>
            <Field
              component={TextField}
              fullWidth={true}
              hintText="Title of article"
              name="title"
              ref="title"
              style={{marginBottom: "21px"}}
              value={this.state.value}
              onBlur={ e => this.setState({title: e.target.value}) }
              withRef
            />
          </Col>

          <Col xs={12} md={6}>
            <h1>Upload Image</h1>
            <RaisedButton className="formBtn" rippleStyle={{minHeight: "52px"}} secondary={true} icon={ IconsHelper.materialIcon("backup") } label="Choose an Image">
            <input type="file" accept="image/*"
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
              onChange={this.handleUpload.bind(this)} />
            </RaisedButton>
          </Col>
        </Row>
      </form>

        <Row style={{ paddingBottom: 21 }}>
          <Col xs={12}>
            { this.state.loadingFile && <LinearProgress mode="indeterminate" id="LinearProgressEdit"/> }
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
          <Paper className="mdEditorPaper" zDepth={2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <Row>
            <Col xs={1} />
            <Col xs={10}>
            { this.state.tile &&
              <GridList cellHeight={300} cols={1} style={{ width: '100%', height: 'auto', overflowY: 'auto', marginBottom: 24, paddingLeft:"15px", paddingRight:"15px"}} >
                <GridTile
                  key={this.state.tile.res.secure_url}
                  title={this.state.title || this.state.tile.files[0].name}
                  cols={1} >
                  <img src={this.state.tile.res.secure_url} />
                </GridTile>
              </GridList>
            }
            </Col>
            </Row>
            </div>

            <ReactMarkdownMediumEditor markdown={ this.state.value } options={options} onChange={console.log.bind(this)} />
          </Paper>
          </Col>
          <Col xs={12} style={{marginTop: "18px"}}>
            <RaisedButton label="Submit" primary={true} type="submit" disabled={pristine || submitting} />
            <RaisedButton label="Cancel" primary={true} disabled={pristine || submitting} onClick={reset} />
          </Col>
        </Row>

      </Grid>
    )
  }
}
export default reduxForm({
  form: 'InfoEditForm',
  validate
})(InfoViewEdit);
