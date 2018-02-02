import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import visibilityFilter from './visibilityFilter';
import pageSkip from './pageSkip';

const rootReducer = combineReducers({
  visibilityFilter,
  pageSkip,
  router: routerReducer
});

export default rootReducer;
