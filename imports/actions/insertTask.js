import { Meteor } from 'meteor/meteor';

export default function insertTask(task) {
  return () => {
    Meteor.call('tasks.insert', task);
  };
}
