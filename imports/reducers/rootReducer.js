import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import visibilityFilter from './visibilityFilter';
import pageSkip from './pageSkip';
import toasts from './toasts';
import { taskList, currentTask } from './tasks';

const rootReducer = combineReducers({
  router: routerReducer,
  visibilityFilter,
  pageSkip,
  toasts,
  tasks: taskList,
  currentTask,
});

export default rootReducer;
