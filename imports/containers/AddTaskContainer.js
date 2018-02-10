import connect from 'react-redux-connect-lifecycle';
import Router from 'react-router-redux';
import TaskMethods from '/imports/api/tasks/methods';
import AddTask from '/imports/ui/AddTask';
import { addToast } from '/imports/actions/toasts';
import { getTask } from '/imports/actions/tasks';

const mapStateToProps = ({ currentTask, router }) => {
  return {
    loading: !currentTask.ready,
    task: (router.location.pathname === '/add') ? null : currentTask.item,
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: ({ match }) => (getTask(match.params._id)),
  onSubmit: (item) => (dispatch) =>
    dispatch(TaskMethods.upsert.action(item))
      .then(() => dispatch(Router.push('/')))
      .catch((err) => dispatch(addToast({ err }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
