import { getTasks } from '/imports/actions/tasks';
import connect from 'react-redux-connect-lifecycle';
import Tasklist from '/imports/ui/TaskList';

const mapStateToProps = ({ tasks }) => {
  return {
    loading: !tasks.ready,
    tasks: tasks.item,
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: () => (getTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
