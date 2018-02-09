import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { collections } from './collections';
import visibilityFilter from './visibilityFilter';
import pageSkip from './pageSkip';
import toasts from './toasts';

const rootReducer = combineReducers({
  collections,
  visibilityFilter,
  pageSkip,
  toasts,
  router: routerReducer,
});

export default rootReducer;
