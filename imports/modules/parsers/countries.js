import { bulkCreateOrUpdate } from '../../api/Country/methods';
import { HTTP } from 'meteor/http';

const stringify = (s) => s ? JSON.stringify(s) : "";

// Wrap in Meteor.bindEnvironment to prevent error
export const updateCountries = Meteor.bindEnvironment(() => {
  HTTP.get('https://restcountries.eu/rest/v1/all', {}, function(err, result) {
    if (err)
      return console.log("Error: Could not retrive countries from restcountries.eu.");

    const toInsert = result.data.map(country => {
      const { name, region, alpha2Code, alpha3Code, altSpellings, timezones, callingCodes, currencies, languages } = country;

      return {
        name,
        alpha2Code,
        alpha3Code,
        region,
        altSpellings: stringify(altSpellings),
        timezones: stringify(timezones),
        callingCodes: stringify(callingCodes),
        currencies: stringify(currencies),
        languages: stringify(languages),
      };
    });

    bulkCreateOrUpdate(toInsert);
  });
});
