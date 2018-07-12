
import _ from 'lodash';

export const wirePublication = options => {

  if (options.auth) {
    
  }
};

export const wirePublications = methods => {
  const returnPublications = {};

  _.forEach(methods, options => {
    returnPublications[options.name] = wirePublication(options);
  });

  return returnPublications;
};
