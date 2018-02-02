import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

const logger = createLogger();
export const history = createHistory();
const routerMiddle = routerMiddleware(history);

const enhancers = [
  applyMiddleware(ReduxThunk, logger, routerMiddle),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

export const Store = createStore(rootReducer, {}, compose(...enhancers));
