import { wireSubscriptions } from '/imports/lib/wireMethods';
import { Tasks } from '/imports/api/tasks/collection';

// creates actions and reducers for meteor subcriptions
// name: name of subscription in the store
// run: fetch function to execute
// subscription: name matching a meteor publish

const subscriptions = [
  {
    name: 'tasks',
    returns: '[Task]',
    subscription: 'getTasks',
    run: (params) => Tasks.find(params).fetch(),
  },
  {
    name: 'task',
    returns: 'Task',
    subscription: 'getTasks',
    run: (params) => Tasks.findOne(params),
  },
];

export default wireSubscriptions(subscriptions);
