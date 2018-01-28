import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Tasks } from './tasks';

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
});

/*
export const addTaskMethod = new ValidatedMethod({

  name: 'tasks.addTaskMethod',

  validate: new SimpleSchema({
    description: { type: String },
    details: { type: String, optional: true },
  }).validator(),

  run({ description, details }) {
    Tasks.insert({ description, details }, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });
  },
});

export const updateTaskMethod = new ValidatedMethod({

  name: 'tasks.updateTaskMethod',

  validate: new SimpleSchema({
    description: { type: String },
    details: { type: String, optional: true },
  }).validator(),

  run({ description, details }) {
    Tasks.insert({ description, details });
  },
});

Meteor.methods({
  [addTaskMethod.name]: function(args) {
    addTaskMethod.validate.call(this, args);
    addTaskMethod.run.call(this, args);
  },
  [updateTaskMethod.name]: function(args) {
    addTaskMethod.validate.call(this, args);
    addTaskMethod.run.call(this, args);
  },
});
*/
