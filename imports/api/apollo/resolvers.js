import '/imports/api/';
import { Tasks } from '/imports/api/tasks/collection';
import { graphqlResolvers } from '/imports/lib/wireMethods';

const Query = {
  say() {
    return 'hello world';
  },
  async tasks() {
    return Tasks.find().fetch();
  },
  async task(root, { _id }) {
    return Tasks.findOne(_id);
  },
};

const mutations = {
  /*
  async setDone(root, { _id, done }) {
    return setTaskDone.callPromise({ _id, done });
  },
  */
};

const Mutation = Object.assign(mutations, graphqlResolvers);

export const resolvers = { Query, Mutation };
