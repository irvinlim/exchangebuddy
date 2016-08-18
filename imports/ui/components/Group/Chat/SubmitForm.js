import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const submitFormStyle ={ height: $(window).height()*1/5, padding: "0 2% 0" }
const validate = values => {
  const errors = {};
  const requiredFields = [ 'message' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
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
          <Field
            name="message"
            component={TextField}
            hintText="Message"
            floatingLabelText="Message"
            multiLine={true}
            fullWidth={true}
            rowsMax={3}
            rows={3}
            ref="msg"
            withRef  />
      </form>
    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'submitForm',
  validate
})(SubmitForm);
