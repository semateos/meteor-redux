import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/collection';
import { connect } from 'react-redux';
import Tasklist from '/imports/ui/TaskList';


const TaskListContainer = withTracker(() => {
  const tasksHandle = Meteor.subscribe('tasks.getTasks');
  const loading = !tasksHandle.ready();
  const tasks = Tasks.find().fetch();

  return {
    loading,
    //tasks,
  };
})(Tasklist);

const mapStateToProps = state => {
  return {
    tasks : Object.values(state.collections.tasks)
  }
}

export default connect(mapStateToProps, {})(TaskListContainer);
