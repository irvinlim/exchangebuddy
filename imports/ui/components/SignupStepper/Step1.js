import React from 'react';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import { ReduxForm, TextFormField } from '../Field';
import NextButton from './NextButton';

export const fields = [ 'displayName' ];

const saveForm = (callback) => {
  return (values) => {
    const { displayName } = values;

    Meteor.call('updateProfile', { id: Meteor.userId(), displayName }, (err, result) => {
      if (!err)
        if (callback)
          callback();
    });
  };
};

const validate = values => {
  const errors = {};
  const requiredFields = [ 'displayName' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
};

class Step1 extends React.Component {
  render() {
    const { fields: { displayName }, handleNext, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(saveForm(handleNext)) }>
        <Row>
          <Col xs={12}>
            <TextFormField name="displayName" floatingLabelText="Your Name" {...displayName} />
          </Col>
        </Row>

        <div style={{ marginTop: 12 }}>
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}


// Decorate with redux-form
export default reduxForm({
  form: 'signupStep1',
  validate, fields
})(Step1);
