import base64url from "base64url";
import sha256, { Hash, HMAC } from "fast-sha256";

const postRoutes = Picker.filter(function(req, res) {
  // you can write any logic you want.
  // but this callback does not run inside a fiber
  // at the end, you must return either true or false
  return req.method == "POST";
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

// function base64_url_decode($input) {
//   return base64_decode(strtr($input, '-_', '+/'));
// }

postRoutes.route('/facebook/deauth', function(params, req, res, next) {
  console.log(params)

  console.log(parse_signed_request(req.signed_request));

});
