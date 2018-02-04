import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();
export const history = createHistory();
const routerMiddle = routerMiddleware(history);

const enhancers = [
  applyMiddleware(ReduxThunk, logger, routerMiddle),
];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export const Store = createStore(rootReducer, {}, compose(...enhancers));
