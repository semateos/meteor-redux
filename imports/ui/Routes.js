import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TaskListContainer from '/imports/containers/TaskListContainer';
import AddTaskContainer from '/imports/containers/AddTaskContainer';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={TaskListContainer} />
    <Route path="/add" component={AddTaskContainer} />
    <Route path="/edit/:_id" component={AddTaskContainer} />
  </Switch>
);
