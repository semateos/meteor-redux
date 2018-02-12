import connect from 'react-redux-connect-lifecycle';
import Router from 'react-router-redux';
import TaskMethods from '/imports/api/tasks/methods';
import AddTask from '/imports/ui/AddTask';
import { addToast } from '/imports/actions/toasts';
import { getTask } from '/imports/api/tasks/subscriptions';

const mapStateToProps = ({ task, router }) => {
  return {
    loading: !task.ready,
    task: (router.location.pathname === '/add') ? null : task.item,
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: ({ match }) => (getTask.start({ _id: match.params._id })),
  onSubmit: (item) => (dispatch) =>
    dispatch(TaskMethods.upsertTask.action(item))
      .then(() => dispatch(Router.push('/')))
      .catch((err) => dispatch(addToast({ err }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
