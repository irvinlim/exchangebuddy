import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MarkdownTextField from './MarkdownTextField';

import * as IconsHelper from '../../../../../util/icons';
import * as ImagesHelper from '../../../../../util/images';
import * as InfoHelper from '../../../../../util/info';
import * as Colors from 'material-ui/styles/colors';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'markdown' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });
  return errors;
};

const submitForm = (self, about, aboutId, sectionId, callback) => (values) => {
  let method;

  const params = {
    userToken: Meteor.userToken(),
    userId: Meteor.userId(),
    sectionId,
    imageId: self.state.tile && self.state.tile.res.public_id,
    content: values.markdown,
  };

  if (about == 'country') {
    method = 'CountryInfoItem.pushRevision';
    params.countryCode = aboutId;
  } else if (about == 'university') {
    method = 'UniversityInfoItem.pushRevision';
    params.universityId = aboutId;
  } else {
    return;
  }

  Meteor.call(method, params, (err, result) => {
    if (err)
      console.error(`Error in invoking ${method}: ` + err);
    else if (callback)
      callback();
  });
};

class InfoViewEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      loading: false,
      tile: null,
      title: ""
    };
  }

  handleUpload(e) {
    const self = this;
    const files = e.currentTarget.files;
    let tile = {};
    tile.files = files;

    this.setState({ loadingFile: true });

    // upload files to root cloudinary folder
    Cloudinary.upload(files, {}, function(err, res) {
      tile.res = res;
      self.setState({ tile: tile });
      self.setState({ loadingFile: false });
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, about, aboutId, sectionId, groupId, item } = this.props;

    const Overlay = () => (
      <CardTitle
        className="info-title"
        title={ item.section.label }
        subtitle="Help ExchangeBuddy by contributing to the information below!"
        style={{ zIndex: 10 }}
        titleStyle={{ lineHeight: "3rem", fontWeight: 400, fontSize:"250%", color: Colors.grey50 }}
        subtitleStyle={{ color: Colors.grey200, fontSize: "16px" }} />
    );

    const backUrl = `/group/${groupId}/info/${about}/${sectionId}`;

    const onSubmit = () => {
      this.props.actions.showSnackbar("Your edit has been saved.");
      browserHistory.push(backUrl);
    };

    const submitHandler = handleSubmit(submitForm(this, about, aboutId, sectionId, onSubmit));

    return (
        <Paper className="info-text-container" zDepth={2}>
          <CardMedia
            className="info-title-container"
            mediaStyle={{ maxHeight: 500, overflow:"hidden" }}
            overlay={ <Overlay /> }>

            <div>
              <input
                type="file"
                accept="image/*"
                style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, zIndex: 1, }}
                onChange={this.handleUpload.bind(this)} />
              <img src={ this.state.tile ? this.state.tile.res.secure_url : InfoHelper.getImageUrl(item, 500) } />
            </div>

          </CardMedia>

        { this.state.loadingFile && <LinearProgress mode="indeterminate" id="LinearProgressEdit"/> }

        <form onSubmit={ submitHandler }>
          <Col xs={12}>
            <Field name="markdown" component={ MarkdownTextField } markdown={ item.content } />
          </Col>
          <div className="row center-md center-xs" style={{marginTop: "18px"}}>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Submit" primary={true} disabled={ pristine || submitting } type="submit" />
            </Col>
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton className="raised-btn" fullWidth={true} label="Cancel" primary={true} onTouchTap={ () => browserHistory.push(backUrl) } />
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
