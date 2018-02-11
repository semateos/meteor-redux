import { getTasks } from '/imports/api/tasks/subscriptions';
import connect from 'react-redux-connect-lifecycle';
import Tasklist from '/imports/ui/TaskList';

const mapStateToProps = ({ tasks }) => {
  return {
    loading: !tasks.ready,
    tasks: tasks.item,
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: () => (getTasks.start()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
