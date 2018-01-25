import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TasksContainer } from '../containers/TasksContainer';
import { AddTask } from '../ui/AddTask';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={TasksContainer} />
    <Route path="/add" component={AddTask} />
    <Route path="/edit/:_id" component={AddTask} />
  </Switch>
);
