
import _ from 'lodash';

export const wirePublication = pub => {
  const pubClone = { ...pub };
  return pubClone;
};

export const wirePublications = pubs => _.map(pubs, pubOptions => wirePublication(pubOptions));
