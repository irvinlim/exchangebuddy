import React from 'react';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../../Field';
import PrevButton from '../PrevButton';
import NextButton from '../NextButton';
import ExchangeTermSelect from './ExchangeTermSelect';

import { propExistsDeep } from '../../../../util/helper';

export const fields = [ 'exchangeUniName' ];

const saveForm = (callback) => {
  return (values) => {
    const { exchangeUniName } = values;

    Meteor.call('updateProfile', { id: Meteor.userId(), exchangeUniName }, (err, result) => {
      if (!err)
        if (callback)
          callback();
    });
  };
};

const validate = values => {
  const errors = {};
  const requiredFields = [ 'exchangeUniName' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
};

const filter = (searchText, key) => {
  searchText = searchText.toLowerCase();
  key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

  if (searchText.length < 3)
    return false;

  return searchText.split(' ').every(searchTextSubstring =>
    key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
  );
};

class Step2 extends React.Component {
  render() {
    const { universities, handleNext, handlePrev, handleSubmit, submitting, formState } = this.props;

    // Year of exchange
    const year = new Date().getFullYear();
    const years = [];
    let i;
    for ( i = year - 1; i < year + 5; i++ )
      years.push(i);

    // Uni name
    const uniName = propExistsDeep(formState, [ 'signupStep2', 'values', 'exchangeUniName' ]) && formState.signupStep2.values.exchangeUniName;

    return (
      <form onSubmit={ handleSubmit(saveForm(handleNext)) }>

        <AutoCompleteFormField
          id="exchangeUniName"
          name="exchangeUniName"
          floatingLabelText="Which university will you be going to for exchange?"
          openOnFocus={true}
          filter={ filter }
          maxSearchResults={10}
          onNewRequest={ (chosenRequest, index) => console.log(chosenRequest) }
          dataSource={ universities.map((uni) => uni.name ) } />

        <SelectFormField
          name="exchangeUniYear"
          floatingLabelText="Start year of exchange">
          { years.map(year => <MenuItem key={year} value={year} primaryText={year} />) }
        </SelectFormField>

        <ExchangeTermSelect uniName={ uniName } />

        <div style={{ marginTop: 12 }}>
          <PrevButton onTouchTap={ handlePrev } label="Back" disabled={submitting} />
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}


// Decorate with redux-form
export default reduxForm({
  form: 'signupStep2',
  validate, fields
})(Step2);
