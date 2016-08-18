import { Meteor } from 'meteor/meteor';

// Models
import Country from '../../api/Country';
import University from '../../api/University';

// Methods
import { updateCountries } from '../../modules/parsers/countries';
import { updateUniversities } from '../../modules/parsers/topuniversities';


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
