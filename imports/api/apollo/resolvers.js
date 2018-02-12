import '/imports/api/';
import { Tasks } from '/imports/api/tasks/collection';
import { graphQLResolvers } from '/imports/lib/wireMethods';

const Query = {
  say(root, { query }) {
    console.log(query);
    if(query){
      return query.something;
    }
    return 'hello!';
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

const Mutation = Object.assign(mutations, graphQLResolvers);

export const resolvers = { Query, Mutation };
