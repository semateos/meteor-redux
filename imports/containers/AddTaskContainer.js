import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { upsert } from '/imports/api/tasks/methods';
import { Tasks } from '/imports/api/tasks/collection';
import { withTracker } from 'meteor/react-meteor-data';
import AddTask from '/imports/ui/AddTask';

const AddTaskContainer = withTracker(({ match, ...rest }) => {
  //const tasksHandle = Meteor.subscribe('tasks.getTasks');
  //const loading = !tasksHandle.ready();
  //const tasks = Tasks.find().fetch();

  return {
    item: {description: 'yaaddda'}
  };
})(AddTask);


export default compose(
  connect(null, {
    onSubmit: upsert.action,
  })
)(AddTaskContainer);
