import { Meteor } from 'meteor/meteor';
import connect from 'react-redux-connect-lifecycle';
import Router from 'react-router-redux';
import TaskMethods from '/imports/api/tasks/methods';
import { Tasks } from '/imports/api/tasks/collection';
import { withTracker } from 'meteor/react-meteor-data';
import AddTask from '/imports/ui/AddTask';
import { addToast } from '/imports/actions/toasts';
import { getTask } from '/imports/actions/tasks';

const mapStateToProps = (state, { match }) => {
  return {
    task: (state.collections.tasks) ? state.collections.tasks[match.params._id] : {},
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: (props) => (dispatch) => {
    dispatch(getTask(props.match.params._id));
  },
  onSubmit: (item) => (dispatch) =>
    dispatch(TaskMethods.upsert.action(item))
      .then(() => dispatch(Router.push('/')))
      .catch((err) => dispatch(addToast({ err }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
