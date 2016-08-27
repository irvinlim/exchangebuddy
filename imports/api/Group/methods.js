import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import Group from '.';
import University from '../University';
import User from '../User';
import Country from '../Country';

import EventSearch from "facebook-events-by-location-core";
import meetup from "meetup-api";

const Meetup = meetup({ "key": Meteor.settings.private.Meetup.apiKey });

if (Meteor.isServer) {
  Meteor.methods({

    'Group.get'(id) {
      check(id, Number);

      return Group.findOne({ where: { id }, include: [ University, User ] }).then(function(result) {
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

    'Group.getMeetupEvents'(university) {
      check(university, Object);

      // Should show localised events first, before showing general ones, in the following order:
      // 1. Use university's latlng
      // 2. Use university's city + countryCode
      // 3. Use countryCode + capital city
      // Don't use country's latlng

      return Country.findById(university.countryCode).then(function(result) {
        const country = result && result.get();

        return new Promise(function(resolve, reject) {
          const options = {
            order: "trending",
            page: 20,
            offset: 0,
            desc: true,
          };

          if (university.lat && university.lng) {
            options.lat = university.lat;
            options.lon = university.lng;
          } else if (university.city) {
            options.city = university.city;
            options.country = university.countryCode;
          } else {
            options.city = country.capital;
            options.country = university.countryCode;
          }

          if (university.countryCode == 'US') {
            // If this university has no latLng or city,
            // Check if have state, otherwise the city defaults to Washington D.C.
            // Washington D.C. does not belong in a state so it breaks Meetup API's query
            // We have no choice. Use a default of New York, NY.
            if (!university.lat && !university.lng && !university.city && !university.state) {
              options.state = 'NY';
              options.city = 'New York';
            }
          }

          Meetup.getOpenEvents(options, (error, events) => {
            if (error)
              throw new Meteor.Error('Group.getMeetupEvents.MeetupError', error);
            else
              resolve(events);
          });

        });
      }).then(function(events) {
        return events;
      });
    },

  });
}
