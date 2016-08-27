import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import Group from '.';
import University from '../University';
import User from '../User';
import Country from '../Country';

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

    'Group.getFbEvents'(countryCode, uniLatLng) {
      check(countryCode, String);
      check(uniLatLng, Match.Optional(Array));

      let esCountry, esUni;

      return Country.findById(countryCode).then(function(result) {
        const country = result && result.get();

        if (!country)
          throw new Meteor.Error('Group.getFbEvents.undefinedCountry', 'A valid country code must be provided.');

        // Search by latLng of country center & CBD of city of uni
        esCountry = new EventSearch({
          lat: country.lat,
          lng: country.lng,
          accessToken: Meteor.settings.public.Facebook.appAccessToken,
          // distance in metres
          distance: 50000
        });

        if (uniLatLng)
          esUni = new EventSearch({
            lat: uniLatLng[0],
            lng: uniLatLng[1],
            accessToken: Meteor.settings.public.Facebook.appAccessToken,
            // distance in metres
            distance: 50000
          });

        return esCountry.search();
      }).then(function(res) {
        const combineEvents = (res2) => {
          let combinedEvents = res.events;

          if (res2)
            combinedEvents = combinedEvents.concat(res2.events);

          console.log(combinedEvents && combinedEvents.length);

          return combinedEvents.sort((a, b) => {
            const aNum = a.stats.attending;
            const bNum = b.stats.attending;

            if (aNum < bNum)
              return 1;
            else if (aNum > bNum)
              return -1;
            else
              return 0;
          });
        };

        if (!esUni)
          return combineEvents(null);

        return esUni.search().then(combineEvents).catch(function(error) {
          throw new Meteor.Error("Group.getFbEvents.EventSearchError", JSON.stringify(error))
        });
      });
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
