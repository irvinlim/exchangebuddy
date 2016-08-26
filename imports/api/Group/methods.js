import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import Group from '.';
import University from '../University';
import User from '../User';
import EventSearch from "facebook-events-by-location-core";
import meetup from "meetup-api";

if (Meteor.isServer) {
  Meteor.methods({

    'Group.get'(id) {
      check(id, Number);

      return Group.findOne({ where: { id }, include: [ University ] }).then(function(result) {
        const group = result && result.get({ plain: true });
        return group;
      });
    },

    'Group.getUsers'(id) {
      check(id, Number);

      return Group.findOne({ where: { id } }).then(function(result) {
        return result && result.getUsers({ include: [ { model: University, as: 'homeUniversity' } ] });
      }).then(function(result) {
        return result && result.map(user => user.get({ plain: true }));
      });
    },

    'Group.getFbEvents'(countryId, uniCBDLatLng) {
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

    'Group.getMeetupEvents'(latLng, cityName, pageNumber) {
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
    },

  });
}
