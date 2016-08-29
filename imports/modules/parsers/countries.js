import { bulkCreateOrUpdate } from '../../api/Country/methods';
import { HTTP } from 'meteor/http';

const stringify = (s) => s ? JSON.stringify(s) : "";

// Wrap in Meteor.bindEnvironment to prevent error
export const updateCountries = () => {
  return new Promise(function(resolve, reject) {

    HTTP.get('https://restcountries.eu/rest/v1/all', {}, function(err, result) {
      if (err) {
        console.log("Error: Could not retrive countries from restcountries.eu.");
        reject(err);
      }

      const toInsert = result.data.map(country => {
        const { name, region, capital, alpha2Code, alpha3Code, altSpellings, timezones, callingCodes, currencies, languages, latlng } = country;

        return {
          name,
          alpha2Code,
          alpha3Code,
          region,
          capital,
          lat: latlng[0],
          lng: latlng[1],
          altSpellings: stringify(altSpellings),
          timezones: stringify(timezones),
          callingCodes: stringify(callingCodes),
          currencies: stringify(currencies),
          languages: stringify(languages),
        };
      });

      bulkCreateOrUpdate(toInsert).then(function() {
        // Resolve after complete
        resolve();
      });
    });

  });
};
