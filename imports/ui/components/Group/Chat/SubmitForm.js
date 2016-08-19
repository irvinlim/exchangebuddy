import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const submitFormStyle = {
  height: $(window).height() / 5,
  padding: "0 2% 0"
};

const validate = values => {
  const errors = {};
  const requiredFields = [ 'message' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
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
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form style ={submitFormStyle} onSubmit={handleSubmit}>
        <div>
          <Field
            name="message"
            component={TextField}
            hintText="Message"
            floatingLabelText="Message"
            fullWidth={true}
            rowsMax={3}
            rows={3}
            ref="msg"
            withRef  />
          </div>
          <div>
            <RaisedButton style={{ marginRight: 10 }} primary={true} type="submit" disabled={pristine || submitting}>Submit</RaisedButton>
            <RaisedButton style={{ marginRight: 10 }} type="button" disabled={pristine || submitting} onClick={reset}>Clear</RaisedButton>
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
