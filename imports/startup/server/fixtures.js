import { Meteor } from 'meteor/meteor';

// Models
import Country from '../../api/Country';
import University from '../../api/University';
import UniversityInfoSection from '../../api/UniversityInfoSection';
import CountryInfoSection from '../../api/CountryInfoSection';
import DataStore from '../../api/DataStore';

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

// TEMP: Update universities after 5 sec because of async
setTimeout(() => {

  // Add some universities
  University.findOne({
    where: { name: "Singapore University of Technology and Design (SUTD)" }
  }).then(function(result) {
    if (!result)
      University.create({
        name: "Singapore University of Technology and Design (SUTD)",
        city: "Singapore",
        countryCode: "SG",
        logoImageId: 'logo-sutd-main_hphs2p',
        bgImageId: 'sutd-slider-aeriel-view_uckqr6_cdfnan',
        emailDomains: JSON.stringify([ 'sutd.edu', 'sutd.edu.sg' ]),
        terms: JSON.stringify([ "Semester 1", "Semester 2", "Semester 3" ]),
      });
  });

  // Add data for some universities
  University.update({
    city: "Singapore",
    emailDomains: JSON.stringify([ 'nus.edu.sg', 'u.nus.edu' ]),
    terms: JSON.stringify([ "Semester 1", "Semester 2", "Special Term Part 1", "Special Term Part 2" ]),
  }, { where: { name: "National University of Singapore (NUS)" } });

  University.update({
    city: "Singapore",
    emailDomains: JSON.stringify([ 'ntu.edu', 'ntu.edu.sg' ]),
    terms: JSON.stringify([ "Semester 1", "Semester 2", "Special Term I", "Special Term II" ]),
  }, { where: { name: "Nanyang Technological University, Singapore (NTU)" } })

  University.update({
    name: "Singapore Management University (SMU)",
    city: "Singapore",
    emailDomains: JSON.stringify([ 'smu.edu', 'smu.edu.sg' ]),
    terms: JSON.stringify([ "Semester 1", "Semester 2" ]),
  }, { where: { name: "Singapore Management University" } });

}, 5000);

// Add currency exchange rates data
// TODO: Set a cron job to update exchange rates
// $.getJSON("http://api.fixer.io/latest?base=SGD",
//   result => jsonfile.writeFile('../../../data/exchangeRates.json', result, function(err) { }))

// Add university info sections
const uniInfoSections = [
  { label: 'General Tips', subtitle: "Must-know tips for every student!" },
  { label: 'Pre-Departure', subtitle: "Don't forget your passport!", defaultContentHeadings: JSON.stringify([ 'Essential items', 'Suggested packing list' ]) },
  { label: 'Expenses', defaultContentHeadings: JSON.stringify([ 'On-campus accommodation', 'Transport', 'Living costs' ]) },
  { label: 'Getting Around', defaultContentHeadings: JSON.stringify([ 'From the airport', 'By train/subway', 'By bus', 'By taxi', 'Cycling', 'Walking' ]) },
  { label: 'Academic', defaultContentHeadings: JSON.stringify([ 'Language of instruction', 'Courses & modules', 'Academic rigor', 'School terms' ]) },
  { label: 'Administrative', defaultContentHeadings: JSON.stringify([ 'Important phone numbers', 'How to receive help' ]) },
  { label: 'Campus Life', subtitle: "All work and no play makes $USERNAME a dull person!", defaultContentHeadings: JSON.stringify([ 'Orientation activities', 'Clubs & societies', 'University events' ]) },
  { label: 'School Amenities', subtitle: "Find out more about the facilities around campus.", defaultContentHeadings: JSON.stringify([ 'Healthcare', 'Sports facilities', 'Getting daily necessities', 'Banks & ATMs', 'Post offices', 'Internet connectivity' ]) },
  { label: 'Activities Outside School', subtitle: "Going on exchange isn't all about just staying in school!", defaultContentHeadings: JSON.stringify([ 'Places of interest', 'Shopping malls', 'Food', 'Night life' ]) },
];

UniversityInfoSection.count({}).then(function(count) {
  if (!count)
    uniInfoSections.forEach(section => {
      UniversityInfoSection.create(section);
    });
});

// Add country info sections
const countryInfoSections = [
  { label: 'National Languages' },
  { label: 'National Holidays' },
  { label: 'Tourist Attractions' },
  { label: 'Festivals & Culture' },
  { label: 'Food' },
  { label: 'Emergencies', subtitle: "Important phone numbers in case of emergency." },
  { label: 'Telecommunications' },
  { label: 'Banking' },
];

CountryInfoSection.count({}).then(function(count) {
  if (!count)
    countryInfoSections.forEach(section => {
      CountryInfoSection.create(section);
    });
});

// Add suggested packing list
const packingListDataKey = 'university-pre-departure-suggested-packing-list';
DataStore.findById(packingListDataKey).then(Meteor.bindEnvironment(function(result) {
  if (!result) {
    Assets.getText('data/university/pre-departure-suggested-packing-list.md', (err, data) => {
      if (err)
        return console.log(err);

      if (!data)
        return;

      DataStore.create({
        dataKey: packingListDataKey,
        dataValue: JSON.stringify({
          universityId: -1, // Indicates all universities
          data
        }),
      });
    });
  }
}));
