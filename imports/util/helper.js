
// Dates
export const formatDate = (date) => moment(date).format('"D MMM YYYY');
export const formatTime = (date) => moment(date).format('h:mm A');

// Routes
export const makeRouteSlug = (routes) => {
  return routes.map(route => route.path).filter(route => route && route != '/' && route.substr(0, 1) != ':').join('-');
};

// Objects

/**
 * Checks if a deeply nested property exists.
 * Takes in an array of properties, where each subsequent element is a property of the previous element.
 *
 * For example,
 *     propExistsDeep(object, ['property', 'really', 'deep', 'inside'])
 * returns true if
 *     object.property.really.deep.inside exists.
 */
export const propExistsDeep = function(parent, arrayOfChildProps) {
  if (!parent)
    return false;

  if (!arrayOfChildProps)
    return true;

  let object = parent;
  return arrayOfChildProps.every(function(prop) {
    if (!object.hasOwnProperty(prop))
      return false;
    object = object[prop];
    return true;
  });
};

export const convertToSlug = (Text) => {
  return Text.toLowerCase().replace(/[^\w ]+/g,'').split(' ').filter(s => s.length).join('-');
};
