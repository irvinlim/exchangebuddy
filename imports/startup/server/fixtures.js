import { Meteor } from 'meteor/meteor';

// Models
import Country from '../../api/Country';
import University from '../../api/University';

// Methods
import { updateCountries } from '../../modules/parsers/countries';
import { updateUniversities } from '../../modules/parsers/topuniversities';

var jsonfile = require('jsonfile');

// Add countries data
// TODO: Set a cron job to update countries instead of being in fixtures.
Country.count({}).then(function(count) {
  if (!count)
    updateCountries();
});

// Add universities data
// TODO: Set a cron job to update universities instead of doing it only in fixtures
University.count({}).then(function(count) {
  if (!count)
    updateUniversities();
});

// Add currency exchange rates data
// TODO: Set a cron job to update exchange rates
// $.getJSON("http://api.fixer.io/latest?base=SGD",
//   result => jsonfile.writeFile('../../../data/exchangeRates.json', result, function(err) { }))
