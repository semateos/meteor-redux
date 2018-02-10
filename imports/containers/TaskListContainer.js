import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/collection';
import { getTasks } from '/imports/actions/tasks';
import connect from 'react-redux-connect-lifecycle'
import Tasklist from '/imports/ui/TaskList';

const mapStateToProps = state => {
  return {
    raw: state.collections.tasks,
    tasks: (state.collections.tasks) ? Object.values(state.collections.tasks) : [],
  };
};

const mapDispatchToProps = ({
  onComponentDidMount: () => (getTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
