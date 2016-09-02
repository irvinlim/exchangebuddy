import base64url from "base64url";
import { Meteor } from 'meteor/meteor';

import bodyParser from 'body-parser';
var crypto = require("crypto");


// Add two middleware calls. The first attempting to parse the request body as
// JSON data and the second as URL encoded data.
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );
Picker.middleware( bodyParser.json() );

const postRoutes = Picker.filter(function(req, res) {
  return req.method === "POST";
});


function parse_signed_request(signed_request, secret) {
  encoded_data = signed_request.split('.',2);
  // decode the data
  sig = encoded_data[0];
  json = base64url.decode(encoded_data[1]);
  data = JSON.parse(json); // ERROR Occurs Here!

  // check algorithm - not relevant to error
  if (!data.algorithm || data.algorithm.toUpperCase() != 'HMAC-SHA256') {
      console.error('Unknown algorithm. Expected HMAC-SHA256');
      return null;
  }

  // check sig - not relevant to error
  expected_sig = crypto.createHmac('sha256',secret).update(encoded_data[1]).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace('=','');
  if (sig !== expected_sig) {
      console.error('Bad signed JSON Signature!');
      return null;
  }

  return data;
}

postRoutes.route('/facebook/deauth', function(params, req, res) {
  const response = parse_signed_request(req.body.signed_request, Meteor.settings.private.Facebook.appSecret);
  const userId = response.user_id;
  console.log("Facebook user id to delete user: " + userId);
});
