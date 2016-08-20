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
