
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