import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import pageSkip from './pageSkip';

const rootReducer = combineReducers({
  visibilityFilter,
  pageSkip,
});

export default rootReducer;
