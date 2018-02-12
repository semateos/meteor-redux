import { wireSubscriptions } from '/imports/lib/wireMethods';
import { Tasks } from '/imports/api/tasks/collection';

// creates actions and reducers for meteor subcriptions
// name: name of subscription in the store
// run: fetch function to execute
// subscription: name matching a meteor publish

const subscriptions = [
  {
    name: 'tasks',
    returns: Array,
    params: {
      _id: { type: String, optional: true },
      description: { type: String, optional: true },
      details: { type: String, optional: true },
      done: { type: Boolean, optional: true },
    },
    run: (params) => Tasks.find(params).fetch(),
    subscription: 'tasks.getTasks',
  },
  {
    name: 'task',
    returns: 'Task',
    params: {
      _id: { type: String, optional: true },
      description: { type: String, optional: true },
    },
    run: (params) => Tasks.findOne(params),
    subscription: 'tasks.getTasks',
  }
];

export default wireSubscriptions(subscriptions);
