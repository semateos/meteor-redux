import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Router from 'react-router-redux';
import TaskMethods from '/imports/api/tasks/methods';
import { Tasks } from '/imports/api/tasks/collection';
import { withTracker } from 'meteor/react-meteor-data';
import AddTask from '/imports/ui/AddTask';
import { addToast } from '/imports/actions/toasts';

const AddTaskContainer = withTracker(({ match }) => {

  const tasksHandle = Meteor.subscribe('tasks.getTasks');
  let loading = true;
  let task = {};

  if (match && match.params._id) {
    loading = !tasksHandle.ready();
    task = Tasks.findOne({ _id: match.params._id });
  }

  return {
    loading,
    task,
  };

})(AddTask);

export default connect(null, {
  onSubmit: (item) => (dispatch) =>
    dispatch(TaskMethods.upsert.action(item))
      .then(() => dispatch(Router.push('/')))
      .catch((err) => dispatch(addToast({ err }))),
})(AddTaskContainer);
