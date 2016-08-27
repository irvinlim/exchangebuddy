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

// Meetup images
BrowserPolicy.content.allowImageOrigin( '*.meetupstatic.com' );
BrowserPolicy.content.allowImageOrigin( '*.e.akamai.net' );

// Image CDN
BrowserPolicy.content.allowImageOrigin( 'res.cloudinary.com' );

// Mocks
BrowserPolicy.content.allowImageOrigin( 'avatars.io' );
BrowserPolicy.content.allowImageOrigin( 'media.giphy.com' );
BrowserPolicy.content.allowImageOrigin( 'placeholdit.imgix.net')
BrowserPolicy.content.allowImageOrigin( 'placehold.it')
BrowserPolicy.content.allowImageOrigin( 'lorempixel.com')

// Avatars
BrowserPolicy.content.allowImageOrigin( 'graph.facebook.com' );
BrowserPolicy.content.allowImageOrigin( '*.fbcdn.net' );
BrowserPolicy.content.allowImageOrigin( '*.akamaihd.net' );

// Fonts
BrowserPolicy.content.allowStyleOrigin( 'fonts.googleapis.com' );
BrowserPolicy.content.allowFontOrigin( 'fonts.gstatic.com' );
BrowserPolicy.content.allowFontDataUrl();

// Google Analytics
BrowserPolicy.content.allowOriginForAll( 'https://www.google-analytics.com' );
BrowserPolicy.content.allowImageOrigin( 'https://stats.g.doubleclick.net' );
