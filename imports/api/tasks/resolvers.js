import { Tasks } from './tasks';

export const resolvers = {
  Query: {
    async tasks(root, args, context) {
      return Tasks.find().fetch();
    },
    async task(root, { _id }) {
      return Tasks.findOne(_id);
    },
  },
  Mutation: {
    async addTask(root, { task }) {
      if (task._id) {
        Tasks.update(task._id, { $set: { ...task } });
        return Tasks.findOne(task._id);
      }
      return Tasks.findOne(Tasks.insert({ ...task }));
    },
    async flipTask(root, { _id }) {
      const task = Tasks.findOne(_id);
      Tasks.update({ _id }, { $set: { done: !task.done } });
      return Tasks.findOne(_id);
    },
    async removeTask(root, { _id }) {
      Tasks.remove(_id);
      // TODO check how to return a boolean in GraphQL
      return { _id };
    },
  },
};
