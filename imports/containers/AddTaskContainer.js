import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { upsert } from '/imports/api/tasks/methods';
import { Tasks } from '/imports/api/tasks/collection';
import { withTracker } from 'meteor/react-meteor-data';
import AddTask from '/imports/ui/AddTask';

const AddTaskContainer = withTracker(({ match, ...rest }) => {

  const tasksHandle = Meteor.subscribe('tasks.getTasks');
  let loading = true;
  let task = {};

  if(match && match.params._id){
    loading = !tasksHandle.ready();
    task = Tasks.findOne({_id:match.params._id});
  }

  return {
    loading,
    task
  };

})(AddTask);


export default compose(
  connect(null, {
    onSubmit: upsert.action,
  })
)(AddTaskContainer);
