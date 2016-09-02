import base64url from "base64url";
import { Meteor } from 'meteor/meteor';

import bodyParser from 'body-parser';
var CryptoJS = require("crypto-js");


// Add two middleware calls. The first attempting to parse the request body as
// JSON data and the second as URL encoded data.
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );
Picker.middleware( bodyParser.json() );

const postRoutes = Picker.filter(function(req, res) {
  return req.method === "POST";
});

const parse_signed_request = signed_request => {
    // list(encoded_sig, payload) = explode('.', signed_request, 2);
    const [encoded_sig, payload] = signed_request.split('.', 2);
    console.log(encoded_sig)
    console.log(payload)

    const secret = Meteor.settings.private.Facebook.appSecret; // Use your app secret here

    // decode the data
    // sig = base64_url_decode(encoded_sig);
    // data = json_decode(base64_url_decode(payload), true);
    const sig = base64url.decode(encoded_sig);
    const data = JSON.parse(base64url.decode(payload));

    // confirm the signature
    // expected_sig = hash_hmac('sha256', payload, secret, raw = true);
    var hash = CryptoJS.HmacSHA256(payload, secret);
    console.log(hash)
    var expected_sig = hash.toString(CryptoJS.enc.Base64);

    console.log(expected_sig, 'expected', sig,'sig')

    if (sig !== expected_sig) {
      console.log('Bad Signed JSON signature!');
      return null;
    }

    return data;
  }

postRoutes.route('/facebook/deauth', function(params, req, res) {
  const response = parse_signed_request(req.body.signed_request);
  const userId = response.user_id;
});
