import { Meteor } from 'meteor/meteor';
import { wireMethods } from '/imports/lib/wireMethods';
import { Tasks } from './collection';

const methods = [
  {
    name: 'upsertTask',
    returns: 'Task',
    // auth: true,
    params: {
      _id: { type: String, optional: true },
      description: { type: String, min: 1 },
      details: { type: String, optional: true },
      done: { type: Boolean, optional: true },
    },
    run: async ({ _id, ...item }) => {
      const userId = Meteor.userId();
      const itemWithOwner = { ...item, userId };
      const result = await Tasks.upsert(
        { _id, userId },
        { $set: itemWithOwner }
      );
      const id = result.insertedId ? result.insertedId : _id;
      return Tasks.findOne({ _id: id, userId });
    },
  },
  {
    name: 'setTaskDone',
    returns: 'Task',
    // auth: true,
    params: {
      _id: { type: String },
      done: { type: Boolean },
    },
    run: ({ _id, ...item }) => {
      const userId = Meteor.userId();
      Tasks.update({ _id, userId }, { $set: item });
      return Tasks.findOne({ _id, userId });
    },
  },
  {
    name: 'removeTask',
    returns: Boolean,
    // auth: true,
    params: {
      _id: { type: String },
    },
    run: ({ _id }) => {
      const userId = Meteor.userId();
      return Tasks.remove({ _id, userId });
    },
  },
];

export default wireMethods(methods);
