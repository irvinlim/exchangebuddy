import React from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';

import { EmailFormField } from '../../Field';
import NextButton from '../NextButton';

export const fields = [ 'homeUniEmail' ];

let uniEmailDomains;

const validUniEmail = (value) => {
  if (!validator.isEmail(value))
    return false;

  const domain = value.substr(value.indexOf('@') + 1);

  // Checks for valid email domains.
  // Subdomains of valid domains are considered valid.
  // e.g. valid domains = ['u.nus.edu', 'nus.edu.sg']
  //      xxx@comp.nus.edu.sg is considered valid

  return uniEmailDomains.some(emailDomain => {
    // Check for exact match first.
    if (domain === emailDomain)
      return true;

    // At this point we are checking for subdomains.
    if (domain.length <= emailDomain.length) // If the domain is too short it's definitely wrong
      return false;

    // If emailDomain is x chars long, we check the last x+1 characters.
    // Must be equal to '.' + emailDomain.
    const sliced = domain.slice(domain.length - emailDomain.length - 1);
    return sliced === '.' + emailDomain;
  });
};

const validate = (values) => {
  const errors = {};
  const { homeUniEmail } = values;

  if (!homeUniEmail || !homeUniEmail.length)
    errors['homeUniEmail'] = 'Required';
  else if (!validator.isEmail(homeUniEmail))
    errors['homeUniEmail'] = 'Not valid email';
  else if (!validUniEmail(homeUniEmail))
    errors['homeUniEmail'] = 'Please use your university\'s email address.';

  return errors;
};

const submitForm = (values) => {
  const { homeUniEmail } = values;

  Meteor.call('sendVerificationEmail', { userId: Meteor.userId(), homeUniEmail }, (err, result) => {
    if (err)
      console.log("Error in invoking sendVerificationEmail: " + err);
  });
};

class Step3 extends React.Component {
  render() {
    uniEmailDomains = this.props.emailDomains;

    const { handleSubmit, submitting } = this.props;
    const { user, university, emailDomains } = this.props;

    return (
      <form onSubmit={ handleSubmit(submitForm) }>

        <p>To complete your registration, please enter your email address at <strong>{ university.name }</strong>.</p>
        <p>We will be sending a verification email to confirm your place at the university.</p>

        <p className="small-text">Email domains allowed: { emailDomains.map(x => `@${x}`).join(', ') }</p>

        <EmailFormField
          name="homeUniEmail"
          floatingLabelText="Your university email address" />

        <div style={{ marginTop: 12 }}>
          <NextButton label="Send verification email" disabled={submitting} />
        </div>
      </form>
    );
  }
}


// Decorate with redux-form
export default reduxForm({
  form: 'signupStep3',
  validate, fields
})(Step3);
