import SimpleSchema from 'simpl-schema';
import { ValidatedActionMethod } from '/imports/lib/ValidatedActionMethod';
import { Tasks } from './collection';

export const upsert = new ValidatedActionMethod({

  name: 'tasks.upsert',

  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    description: { type: String },
    details: { type: String, optional: true },
  }).validator(),

  run({ _id, ...item }) {
    Tasks.upsert({ _id }, { $set: item });
    /* Tasks.upsert({ _id }, { $set: item }, (err, res) => {
      // do more stuff here
      console.log('tasks.upsert', err, res);
    }); */
  },
});

export const setDone = new ValidatedActionMethod({

  name: 'tasks.setDone',

  validate: new SimpleSchema({
    _id: { type: String },
    done: { type: Boolean, optional: true },
  }).validator(),

  run({ _id, ...item }) {
    Tasks.update({ _id }, { $set: item });
  },
});

export const remove = new ValidatedActionMethod({

  name: 'tasks.remove',

  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    Tasks.remove({ _id });
  },
});
