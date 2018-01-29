import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TaskListContainer from '/imports/containers/TaskListContainer';
import AddTask from '/imports/ui/AddTask';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={TaskListContainer} />
    <Route path="/add" component={AddTask} />
    <Route path="/edit/:_id" component={AddTask} />
  </Switch>
);
