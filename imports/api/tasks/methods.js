import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Tasks } from './collection';

export const insert = new ValidatedMethod({

  name: 'tasks.insert',

  validate: new SimpleSchema({
    description: { type: String },
    details: { type: String, optional: true },
  }).validator(),

  run({ description, details }) {
    Tasks.insert({ description, details }, (err, res) => {
      //do stuff here
    });
  },
});

export const update = new ValidatedMethod({

  name: 'tasks.update',

  validate: new SimpleSchema({
    _id: { type: String },
    description: { type: String, optional: true },
    details: { type: String, optional: true },
    done: { type: Boolean, optional: true },
  }).validator(),

  run({ description, details }) {
    Tasks.insert({ description, details });
  },
});

/*
Meteor.methods({
  'tasks.insert'(task) {
    console.log('tasks.insert', task);
    const insertedTask = Tasks.insert(task);
    console.log('insertedTask', insertedTask);
  },
  'tasks.remove'(taskId) {
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});*/
