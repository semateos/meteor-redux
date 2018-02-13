import GraphQLJSON from 'graphql-type-json';
import '/imports/api/';
import { graphQLMutationResolvers, graphQLSubscriptionResolvers } from '/imports/lib/wireMethods';

const queries = {
  ping() {
    return 'pong!';
  },
};

const Query = Object.assign(queries, graphQLSubscriptionResolvers);

const mutations = {
  /*
  async setDone(root, { _id, done }) {
    return setTaskDone.callPromise({ _id, done })
  },
  */
};

const Mutation = Object.assign(mutations, graphQLMutationResolvers);

export const resolvers = { JSON: GraphQLJSON, Query, Mutation };
