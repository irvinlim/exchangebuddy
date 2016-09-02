import base64url from "base64url";
import sha256, { Hash, HMAC } from "fast-sha256";
import { Meteor } from 'meteor/meteor';

import bodyParser from 'body-parser';

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

    const secret = Meteor.settings.private.Facebook.appSecret; // Use your app secret here

    // decode the data
    // sig = base64_url_decode(encoded_sig);
    // data = json_decode(base64_url_decode(payload), true);
    const sig = base64url.decode(encoded_sig);
    const data = JSON.parse(base64url.decode(payload));


    // confirm the signature
    // expected_sig = hash_hmac('sha256', payload, secret, raw = true);
    const expected_sig = sha256.hmac(secret, payload);
    console.log(expected_sig, sig, 'checksame')
    console.log(data, 'fb-posted')
    if (sig !== expected_sig) {
      error_log('Bad Signed JSON signature!');
      return null;
    }

    return data;
  }

postRoutes.route('/facebook/deauth', function(params, req, res) {
  console.log('params', params)
  console.log('req', req)

  console.log(parse_signed_request(req.body.signed_request));
  res.end('OK');
});
