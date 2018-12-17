import { Meteor } from 'meteor/meteor';
import { wireMethods } from '/imports/lib/wireMethods';
import { Tasks } from './collection';

const methods = [
  {
    name: 'upsertTask',
    returns: 'Task',
    auth: true,
    params: {
      _id: { type: String, optional: true },
      description: { type: String, min: 1 },
      details: { type: String, optional: true },
      done: { type: Boolean, optional: true },
    },
    run: async ({ _id, auth, ...item }) => {
      const userId = auth.user._id;
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
    auth: true,
    params: {
      _id: { type: String },
      done: { type: Boolean },
    },
    run: ({ _id, auth, ...item }) => {
      const userId = auth.user._id;

      // Grab task from db.
      const task = Tasks.findOne(_id);

      // If user doesn't own task, then kick out
      if (task.userId !== userId) {
        throw new Meteor.Error(403,
          'This task doesn\'t belong to you.');
      }

      Tasks.update({ _id }, { $set: item });
      return Tasks.findOne({ _id, userId });
    },
  },
  {
    name: 'removeTask',
    returns: Boolean,
    auth: true,
    params: {
      _id: { type: String },
    },
    run: ({ _id, auth }) => {
      const userId = auth.user._id;
      return Tasks.remove({ _id, userId });
    },
  },
];

export default wireMethods(methods);
