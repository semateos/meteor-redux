import { Meteor } from 'meteor/meteor';
import { wireMethods } from '/imports/lib/wireMethods';
import { Tasks } from './collection';

const methods = [
  {
    name: 'upsertTask',
    returns: 'Task',
    params: {
      _id: { type: String, optional: true },
      description: { type: String, min: 1 },
      details: { type: String, optional: true },
      done: { type: Boolean, optional: true },
    },
    run: async ({ _id, ...item }) => {
      const result = await Tasks.upsert({ _id }, { $set: item });
      const id = (result.insertedId) ? result.insertedId : _id;
      return Tasks.findOne({ _id: id });
    },
  },
  {
    name: 'setTaskDone',
    returns: 'Task',
    params: {
      _id: { type: String },
      done: { type: Boolean },
    },
    run: ({ _id, ...item }) => {

      const userId = Meteor.userId();

      if (!userId) {
        // Throw errors with a specific error code
        throw new Meteor.Error('Lists.methods.makePrivate.notLoggedIn',
          'Must be logged in to make private lists.');
      }

      Tasks.update({ _id }, { $set: item });
      return Tasks.findOne({ _id });
    },
  },
  {
    name: 'removeTask',
    returns: Boolean,
    params: {
      _id: { type: String },
    },
    run: ({ _id }) => {
      const res = Tasks.remove({ _id });
      return (res);
    },
  },
];

export default wireMethods(methods);
