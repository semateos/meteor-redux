import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';
import { Task } from './Task';

const TaskList = ( { tasks, loading, ...rest }) => {

  if (loading) {
    return <div>loading...</div>;
  }

  if (tasks.length === 0) {
    return <div>no tasks available</div>;
  }

  return (
    <List>
      {tasks.map(item => <Task key={item._id} item={item} {...rest} />)}
    </List>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
};

export default TaskList;
