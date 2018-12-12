
import _ from 'lodash';
import { MeteorReduxSubscription } from '/imports/lib/MeteorReduxSubscription';
import { makeGraphQLQuerySchema } from './wireMethods';

export const graphQLSubscriptionResolvers = {};
export const graphQLQueries = {};
export const allSubscriptions = {};

export const wireSubscription = subcriptionOptions => {
  const subscription = new MeteorReduxSubscription(subcriptionOptions);
  const graphQLQuery = makeGraphQLQuerySchema(subcriptionOptions);

  // write the graphQL resolver for this method:
  const graphQLResolver = async (root, { where }) =>
    where ? subcriptionOptions.run(where) : subcriptionOptions.run();

  graphQLSubscriptionResolvers[subcriptionOptions.name] = graphQLResolver;
  graphQLQueries[subcriptionOptions.name] = graphQLQuery;
  allSubscriptions[subcriptionOptions.name] = subscription;

  return subscription;
};

export const wireSubscriptions = subcriptions => {
  const returnSubscriptions = {};

  _.forEach(subcriptions, subscriptionOptions => {
    returnSubscriptions[subscriptionOptions.name] = wireSubscription(
      subscriptionOptions
    );
  });

  return returnSubscriptions;
};
