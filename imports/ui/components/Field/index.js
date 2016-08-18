import React from 'react';
import { Field } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';

export const TextFormField = ({ name, ...rest }) =>
  <Field
    component={ TextField }
    name={ name }
    fullWidth={true}
    {...rest} />;
