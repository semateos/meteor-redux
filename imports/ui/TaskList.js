import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';
import TaskContainer from '/imports/containers/TaskContainer';

const TaskList = ({ tasks, loading, ...rest }) => {

  if (loading) {
    return <div>loading...</div>;
  }

  if (tasks.length === 0) {
    return <div>no tasks available</div>;
  }

  return (
    <List>
      {tasks.map(item => <TaskContainer key={item._id} item={item} {...rest} />)}
    </List>
  );
};

TaskList.defaultProps = {
  tasks: [],
  loading: true,
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
};

export default TaskList;
