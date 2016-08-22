import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import Group from '.';
import University from '../University';
import User from '../User';
import EventSearch from "facebook-events-by-location-core";
import meetup from "meetup-api";

if (Meteor.isServer) {
  Meteor.methods({

    addUserToGroup(values) {
      check(values, Object);

      const { userId, exchangeUniName, exchangeUniYear, exchangeTerm } = values;
      check(userId, Number);
      check(exchangeUniName, String);
      check(exchangeUniYear, Number);
      check(exchangeTerm, String);

      return University.findOne({ where: { name: exchangeUniName } }).then(function(result) {
        if (!result)
          throw new Meteor.Error("addUserToGroup.undefinedUniversity", "No such university found.");

        const uni = result.get();
        const values = { universityId: uni.id, year: exchangeUniYear, term: exchangeTerm };

        return Group.findOrCreate({ where: values, defaults: values });
      }).then(function(result) {
        const group = result[0];

        if (group)
          return group.addUser(userId);
        else
          return false;
      }).then(function(result) {
        if (result)
          return true;
        else
          return false;
      });
    },

    getUserGroups(userId) {
      check(userId, Number);

      return User.findOne({ where: { id: userId } }).then(function(userResult) {
        return userResult.getGroups();
      }).then(function(result) {
        return result.map(x => x.get({ plain: true }));
      });
    },

    getGroupFbEvents(countryId, uniCBDLatLng) {
      check(countryId, String);
      check(uniCBDLatLng, Array);

      const countryMapping = require('../../../data/topuniversities/countryMapping.json');
      const countryLatLngMapping = require('../../../data/countrytolatlng/countryLatLngMapping.json');
      const latLng = countryLatLngMapping[countryMapping[countryId].toLowerCase()];

      // Search by latLng of country center & CBD of city of uni
      const esCountry = new EventSearch({
        "lat": latLng[0],
        "lng": latLng[1],
        "accessToken": Meteor.settings.public.Facebook.appAccessToken,
        // distance in metres
        "distance": 50000
      });

      const esUni = new EventSearch({
        "lat": uniCBDLatLng[0],
        "lng": uniCBDLatLng[1],
        "accessToken": Meteor.settings.public.Facebook.appAccessToken,
        // distance in metres
        "distance": 50000
      })

      return esCountry.search().then(function (res) {
        return esUni.search().then(function(res2) {
          return res2.events.concat(res.events).sort( (a,b) => {
            if(a.stats.attending < b.stats.attending){
              return 1;
            } else if(a.stats.attending > b.stats.attending){
              return -1;
            } else {
              return 0;
            }
          });
        }).catch(error => console.error(JSON.stringify(error)));
      }).catch(error => console.error(JSON.stringify(error)));


    },

    getGroupMuEvents(latLng, cityName, pageNumber) {
      check(latLng, Array);
      check(cityName, String);
      check(pageNumber, Number);

      // Search events by latLng and city name of uni
      const Meetup = meetup({ "key": Meteor.settings.private.Meetup.apiKey });
      const eventsPromise = new Promise(function(resolve, reject){
        Meetup.getOpenEvents({
          "text": cityName,
          "order": "trending",
          "page": 20,
          "offset": pageNumber,
          "desc": true
        }, (error, events)=>{
          if(error)
            console.log(error);
          else
            resolve(events);
        });

      })
      return eventsPromise.then(function(events) {
        return events;
      })

    }
  });
}
