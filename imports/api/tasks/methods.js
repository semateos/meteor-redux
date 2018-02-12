import { wireMethods } from '/imports/lib/wireMethods';
import { Tasks } from './collection';

const methods = [

  { name: 'upsertTask',
    returns: 'Task',

    validate: {
      _id: { type: String, optional: true },
      description: { type: String, min: 1 },
      details: { type: String, optional: true },
      done: { type: Boolean, optional: true },
    },

    run: ({ _id, ...item }) => {
      Tasks.upsert({ _id }, { $set: item });
      return Tasks.findOne({ _id });
    },
  },

  { name: 'setTaskDone',
    returns: 'Task',

    validate: {
      _id: { type: String },
      done: { type: Boolean },
    },

    run: ({ _id, ...item }) => {
      Tasks.update({ _id }, { $set: item });
      return Tasks.findOne({ _id });
    },
  },

  { name: 'removeTask',
    returns: Boolean,

    validate: {
      _id: { type: String },
    },

    run: ({ _id }) => {
      Tasks.remove({ _id });
    },
  },

];

export default wireMethods(methods);
