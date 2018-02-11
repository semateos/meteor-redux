import { MeteorReduxSubscription } from '/imports/lib/MeteorReduxSubscription';
import { Tasks } from '/imports/api/tasks/collection';

// creates actions and reducers for meteor subcriptions
// key: name of subscription in the store
// get: fetch function to execute
// subscription: name matching a meteor publish

export const getTasks = new MeteorReduxSubscription({
  key: 'tasks',
  get: (params) => Tasks.find(params).fetch(),
  subscription: 'tasks.getTasks',
});

export const getTask = new MeteorReduxSubscription({
  key: 'task',
  get: (params) => Tasks.findOne(params),
  subscription: 'tasks.getTasks',
});
