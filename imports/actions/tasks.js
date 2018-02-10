import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Tasks } from '/imports/api/tasks/collection';

export const getTasks = () =>
  startSubscription({
    key: 'task.list',
    get: () => Tasks.find().fetch(),
    subscribe: () => Meteor.subscribe('tasks.getTasks'),
  });

export const getTask = (_id) =>
  startSubscription({
    key: 'task',
    get: () => Tasks.findOne({ _id }),
    subscribe: () => Meteor.subscribe('tasks.getTasks'),
  });
