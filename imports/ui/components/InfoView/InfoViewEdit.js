import React, {Component, PropTypes} from 'react';
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import * as IconsHelper from '../../../util/icons';
import Paper from 'material-ui/Paper';


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
      tile: null
    }
  }

  componentDidMount() {
    this.refs.title.getRenderedComponent().getRenderedComponent().focus();
  }
  render() {
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
              withRef
            />
          </Col>

          <Col xs={12} md={6}>
            <h1>Upload Image</h1>
            <RaisedButton className="formBtn" secondary={true} icon={ IconsHelper.materialIcon("backup") } label="Choose an Image">
            <input type="file" accept="image/*"
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
              onChange={this.handleUpload} />
            </RaisedButton>
          </Col>
        </Row>

        <Row style={{ paddingBottom: 21 }}>
          <Col xs={12}>
            {this.state.loadingFile?
              <LinearProgress mode="indeterminate" id="LinearProgressEdit"/>
              :
              <div />
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            { this.state.tile &&
              <GridList cellHeight={300} cols={2} style={{ width: '100%', height: 'auto', overflowY: 'auto', marginBottom: 24, paddingLeft:"15px", paddingRight:"15px"}} >
                <GridTile
                  key={this.state.tile.res.secure_url}
                  title={this.state.tile.files[0].name}
                  cols={2} >
                  <img src={this.state.tile.res.secure_url} />
                </GridTile>
              </GridList>
            }
          </div>
          </Col>
        </Row>

        <Row id="mdEditor">
          <Col xs={12}>
            <Paper zDepth={2}>
              <ReactMarkdownMediumEditor markdown={ this.state.value } options={options} onChange={console.log.bind(this)} />
            </Paper>
          </Col>
        </Row>
      </form>
      </Grid>
    )
  }
}
export default reduxForm({
  form: 'InfoEditForm',
  validate
})(InfoViewEdit);
