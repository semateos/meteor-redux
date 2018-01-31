import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/collection';
import Tasklist from '/imports/ui/TaskList';

export default TaskListContainer = withTracker(() => {
  const tasksHandle = Meteor.subscribe('tasks.getTasks');
  const loading = !tasksHandle.ready();
  const tasks = Tasks.find().fetch();

  return {
    loading,
    tasks,
  };
})(Tasklist);
