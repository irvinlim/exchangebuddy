import { bulkCreateOrUpdate } from '../../api/University/methods';
import { convertToSlug } from '../../util/helper';

const parseJSON = (json, callback) => {
  Assets.getText('data/topuniversities/countryMapping.json', (err, countryMapping) => {
    if (err)
      return callback(err);

    const mapped = json.map(uni => {
      let logoUrl = "",
          linkUrl = "";

      if (uni.logo) {
        logoUrl = uni.logo.substr(10);
        logoUrl = logoUrl.substr(0, logoUrl.indexOf("\""));
      }

      if (uni.link) {
        linkUrl = uni.link.substr(9);
        linkUrl = 'http://www.topuniversities.com' + linkUrl.substr(0, linkUrl.indexOf("\""));
      }

      return {
        name: uni.title.trim(),
        countryCode: countryMapping[uni.country_tid],
        topUnisId: uni.cid,
        linkUrl,

        // Pre-upload all logos to Cloudinary, set logoImageId only if JSON data contains it
        logoImageId: uni.logo ? 'university-logos/' + convertToSlug(uni.title) : null
      };
    });

    return callback(null, mapped);
  });
};

export const updateUniversities = () => Meteor.bindEnvironment(() => {
  // Read input file
  Assets.getText('data/topuniversities/299926.json', (err, inputJSON) => {
    // Update parsed JSON to database
    parseJSON(inputJSON, (err, parsed) => {
      if (!parsed)
        return;

      // Add to database
      bulkCreateOrUpdate(parsed);
    });
  });
});
