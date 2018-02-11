import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducers as subscriptionReducers } from '/imports/lib/MeteorReduxSubscription';
import visibilityFilter from './visibilityFilter';
import pageSkip from './pageSkip';
import toasts from './toasts';

const reducers = Object.assign({
  router: routerReducer,
  visibilityFilter,
  pageSkip,
  toasts,
}, subscriptionReducers);

const rootReducer = combineReducers(reducers);

export default rootReducer;
