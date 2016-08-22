// Find help here:  https://themeteorchef.com/snippets/using-the-browser-policy-package/

import { BrowserPolicy } from 'meteor/browser-policy-common';

// Allow all content to be served from the current domain
BrowserPolicy.content.allowSameOriginForAll();

// Recommended settings
BrowserPolicy.content.disallowEval();

// react-facebook-login
BrowserPolicy.content.allowScriptOrigin( 'connect.facebook.net' );
BrowserPolicy.content.allowOriginForAll( 'www.facebook.com' );
BrowserPolicy.content.allowOriginForAll( 'staticxx.facebook.com' );
BrowserPolicy.content.allowScriptOrigin( 'graph.facebook.com' );

// Facebook images
BrowserPolicy.content.allowImageOrigin( 'scontent.xx.fbcdn.net' );
BrowserPolicy.content.allowImageOrigin( 'fbcdn-profile-a.akamaihd.net' );

// Image CDN
BrowserPolicy.content.allowImageOrigin( 'res.cloudinary.com' );

// Mocks
// Avatars
BrowserPolicy.content.allowImageOrigin( 'avatars.io' );

// Gifs
BrowserPolicy.content.allowImageOrigin( 'media.giphy.com' );
