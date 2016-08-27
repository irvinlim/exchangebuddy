import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';

import * as UserHelper from '../../../../../util/user';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'message' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = ''
    }
  });

  return errors;
}

class SubmitForm extends Component {
  componentDidMount() {
    this.refs.msg           // Selects the Text Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus()                // on TextField
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, user } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="message-send-row">
          <div className="message-user-avatar">{ UserHelper.getAvatar(user, 60) }</div>

          <Field
            className="message-send-field"
            name="message"
            component={TextField}
            floatingLabelText="Say something..."
            floatingLabelFixed={true}
            autocomplete="off"
            fullWidth={true}
            multiLine={true}
            rows={2}
            ref="msg"
            withRef />

          <FlatButton className="message-send-button" type="submit" disabled={pristine || submitting} label="Send" />
        </div>
      </form>
    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'submitForm',
  validate
})(SubmitForm);
