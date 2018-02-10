import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Tasks } from '/imports/api/tasks/collection';

export const getTasks = () =>
  startSubscription({
    key: 'tasks',
    get: () => Tasks.find().fetch(),
    subscribe: () => Meteor.subscribe('tasks.getTasks'),
  });
