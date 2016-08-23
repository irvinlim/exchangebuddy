import { bulkCreateOrUpdate } from '../../api/University/methods';
import { convertToSlug } from '../../util/helper';

export const parseJSON = (json) => {
  const countryMapping = require('../../../data/topuniversities/countryMapping.json');

  return json.map(uni => {
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
};

export const updateUniversities = () => {
  // Read input file
  const inputJSON = require('../../../data/topuniversities/299926.json');

  // Update parsed JSON to database
  const parsed = parseJSON(inputJSON);

  // Add to database
  bulkCreateOrUpdate(parsed);
};
