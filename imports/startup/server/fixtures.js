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

// Helpers
import { mapObjPropsToObject, mapObjPropsToArray } from '../../util/helper';


////////////////////////
// Add countries data //
////////////////////////

// TODO: Set a cron job to update countries instead of being in fixtures.
Country.count({}).then(Meteor.bindEnvironment(function(count) {

  if (count)
    return;

  return updateCountries().then(function() {

    return University.count({});

  }).then(function(count) {

    //////////////////////////////////////////
    // Add universities (only if empty set) //
    //////////////////////////////////////////

    if (!count)
      return updateUniversities();

  }).then(function() {

    // ASSERT: All universities and countries have been added

    ///////////////////////////
    // Add some universities //
    ///////////////////////////

    University.findOne({
      where: { name: "Singapore University of Technology and Design (SUTD)" }
    }).then(function(result) {
      if (!result)
        University.create({
          name: "Singapore University of Technology and Design (SUTD)",
          city: "Singapore",
          countryCode: "SG",
          website: "http://www.sutd.edu.sg/",
          logoImageId: 'logo-sutd-main_hphs2p',
          bgImageId: 'sutd-slider-aeriel-view_uckqr6_cdfnan',
          emailDomains: JSON.stringify([ 'sutd.edu', 'sutd.edu.sg' ]),
          terms: JSON.stringify([ "Semester 1", "Semester 2", "Semester 3" ]),
        });
    });


    ////////////////////////////////////
    // Add data for some universities //
    ////////////////////////////////////

    University.update({
      city: "Singapore",
      emailDomains: JSON.stringify([ 'nus.edu.sg', 'u.nus.edu' ]),
      terms: JSON.stringify([ "Semester 1", "Semester 2", "Special Term Part 1", "Special Term Part 2" ]),
      website: "http://www.nus.edu.sg/",
    }, { where: { name: "National University of Singapore (NUS)" } });

    University.update({
      city: "Singapore",
      emailDomains: JSON.stringify([ 'ntu.edu', 'ntu.edu.sg' ]),
      terms: JSON.stringify([ "Semester 1", "Semester 2", "Special Term I", "Special Term II" ]),
      website: "http://www.ntu.edu.sg/",
    }, { where: { name: "Nanyang Technological University, Singapore (NTU)" } })

    University.update({
      name: "Singapore Management University (SMU)",
      city: "Singapore",
      emailDomains: JSON.stringify([ 'smu.edu', 'smu.edu.sg' ]),
      terms: JSON.stringify([ "Semester 1", "Semester 2" ]),
      website: "http://www.smu.edu.sg/",
    }, { where: { name: "Singapore Management University" } });


    ///////////////////////////////////////////////
    // Add data from exchangeCountryDataNus.json //
    ///////////////////////////////////////////////

    Assets.getText('data/exchangeCountryDataNus.json', (err, json) => {
      if (err)
        return;

      json = JSON.parse(json);

      if (!json.dataVersion)
        return;

      let visa, health;

      DataStore.findById('exchangeCountryDataNus').then(function(result) {
        const existingVersion = result && result.get();

        // Don't insert data when version is the same
        if (existingVersion && existingVersion.dataValue && parseInt(existingVersion.dataValue) <= json.dataVersion)
          return;

        // Store in arrays
        visa = mapObjPropsToObject(json.data, (data, countryCode) => data['visa']);
        health = mapObjPropsToObject(json.data, (data, countryCode) => data['health']);

        // Update existing visa
        return DataStore.upsert({
          dataKey: 'country-visa-consular-regulations-visa',
          dataValue: JSON.stringify(visa)
        });
      }).then(function(result) {
        // Update existing medical insurance
        return DataStore.upsert({
          dataKey: 'country-medical-insurance-medical-insurance',
          dataValue: JSON.stringify(health)
        });
      });
    });


    ///////////////////////////////////////////
    // Add data from exchangeUniDataNus.json //
    ///////////////////////////////////////////

    Assets.getText('data/exchangeUniDataNus.json', (err, json) => {
      if (err)
        return;

      json = JSON.parse(json);

      if (!json.dataVersion)
        return;

      let accom, costOfLiving;

      DataStore.findById('version_exchangeUniDataNus').then(function(result) {
        const existingVersion = result && result.get();

        // Don't insert data when version is the same
        if (existingVersion && existingVersion.dataValue && parseInt(existingVersion.dataValue) <= json.dataVersion)
          return;

        // Store in arrays
        accom = mapObjPropsToObject(json.data, (data, universityId) => data['accommodation']);
        costOfLiving = mapObjPropsToObject(json.data, (data, universityId) => data['cost_of_living']);

        // Update existing accommodation
        return DataStore.upsert({
          dataKey: 'university-expenses-accommodation',
          dataValue: JSON.stringify(accom)
        });
      }).then(function(result) {
        // Update existing cost of living
        return DataStore.upsert({
          dataKey: 'university-expenses-cost-of-living',
          dataValue: JSON.stringify(costOfLiving)
        });
      }).then(function(result) {

        /////////////////////////////////////
        // Mass update university websites //
        /////////////////////////////////////

        const promises = mapObjPropsToArray(json.data, (data, universityId) => {
          return University.update({ website: data['website'] }, { where: { id: parseInt(universityId) } });
        });

        return Promise.all(promises);
      }).then(function(result) {
        // Finally, update data version
        return DataStore.upsert({
          dataKey: 'version_exchangeUniDataNus',
          dataValue: json.dataVersion
        });
      });
    });


  });
}));


//////////////////////////////////
// Add university info sections //
//////////////////////////////////

const uniInfoSections = [
  { label: 'About' },
  { label: 'General Tips', subtitle: "Must-know tips for every student!", defaultImageId: "exchangebuddy/section-images/General_Tips" },
  { label: 'Pre-Departure', subtitle: "Don't forget your passport!", defaultContentHeadings: JSON.stringify([ 'Essential items', 'Suggested packing list' ]), defaultImageId: "exchangebuddy/section-images/Checklist" },
  { label: 'Expenses', defaultContentHeadings: JSON.stringify([ 'Accommodation', 'Transport', 'Living Costs' ]), defaultImageId: "exchangebuddy/section-images/Expenses" },
  { label: 'Getting Around', defaultContentHeadings: JSON.stringify([ 'From the airport', 'By train/subway', 'By bus', 'By taxi', 'Cycling', 'Walking' ]), defaultImageId: "exchangebuddy/section-images/Transport" },
  { label: 'Academic', defaultContentHeadings: JSON.stringify([ 'Language of instruction', 'Courses & modules', 'Academic rigor', 'Academic calendar' ]), defaultImageId: "exchangebuddy/section-images/Academics" },
  { label: 'Administrative', defaultContentHeadings: JSON.stringify([ 'Important phone numbers', 'How to receive help' ]), defaultImageId: "exchangebuddy/section-images/Administrative" },
  { label: 'Campus Life', subtitle: "All work and no play makes $USERNAME a dull person!", defaultContentHeadings: JSON.stringify([ 'Orientation Activities', 'Clubs & Societies', 'University Events' ]), defaultImageId: "exchangebuddy/section-images/campus_life" },
  { label: 'School Amenities', subtitle: "Find out more about the facilities around campus.", defaultContentHeadings: JSON.stringify([ 'Healthcare', 'Sports Facilities', 'Getting Daily Necessities', 'Banks & ATMs', 'Post offices', 'Internet Connectivity' ]), defaultImageId: "exchangebuddy/section-images/Amenities" },
  { label: 'Activities Outside School', subtitle: "Going on exchange isn't all about just staying in school!", defaultContentHeadings: JSON.stringify([ 'Places of Interest', 'Shopping Malls', 'Food', 'Night Life' ]), defaultImageId: "exchangebuddy/section-images/Activities_outside_school" },
];

UniversityInfoSection.count({}).then(function(count) {
  if (!count)
    uniInfoSections.forEach(section => {
      UniversityInfoSection.create(section);
    });
});


///////////////////////////////
// Add country info sections //
///////////////////////////////

const countryInfoSections = [
  { label: 'Visa/Consular Regulations', defaultImageId: "exchangebuddy/section-images/Visa", defaultContentHeadings: JSON.stringify([ 'Visa' ]) },
  { label: 'Medical Insurance', defaultImageId: "exchangebuddy/section-images/Healthcare_Insurance", defaultContentHeadings: JSON.stringify([ 'Medical Insurance' ]) },
  { label: 'National Languages', defaultImageId: "exchangebuddy/section-images/Languages", defaultContentHeadings: JSON.stringify([ 'National Languages' ]) },
  { label: 'National Holidays', defaultImageId: "exchangebuddy/section-images/Holidays", defaultContentHeadings: JSON.stringify([ 'Public Holidays', 'Other National Events' ]) },
  { label: 'Tourist Attractions', defaultImageId: "exchangebuddy/section-images/popular_tourist_attractions", defaultContentHeadings: JSON.stringify([ 'Popular Tourist Attractions' ]) },
  { label: 'Festivals & Culture', defaultImageId: "exchangebuddy/section-images/Festivals", defaultContentHeadings: JSON.stringify([ 'Music & Art Festivals', 'Food & Drink Festivals' ]) },
  { label: 'Food', defaultImageId: "exchangebuddy/section-images/Food", defaultContentHeadings: JSON.stringify([ 'Recommended', 'National Food', 'Home Cooking' ]) },
  { label: 'Emergencies', subtitle: "Important phone numbers in case of emergency.", defaultImageId: "exchangebuddy/section-images/emergency", defaultContentHeadings: JSON.stringify([ 'Police', 'Ambulance', 'Fire', 'Emergency Hotline' ]) },
  { label: 'Telecommunications', defaultImageId: "exchangebuddy/section-images/Telecom", defaultContentHeadings: JSON.stringify([ 'Telcos' ]) },
  { label: 'Banking', defaultImageId: "exchangebuddy/section-images/Bank", defaultContentHeadings: JSON.stringify([ 'Local Banks', 'Foreign Banks' ]) },
];

CountryInfoSection.count({}).then(function(count) {
  if (!count)
    countryInfoSections.forEach(section => {
      CountryInfoSection.create(section);
    });
});

/////////////////////////////////////////////
// Add suggested packing list to DataStore //
/////////////////////////////////////////////

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
          "-1": data // Indicates all universities
        }),
      });
    });
  }
}));
