import { Tracker } from 'meteor/tracker';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers/rootReducer';

export const history = createHistory();
const logger = createLogger();
const routerMiddle = routerMiddleware(history);

const { sources, subscriptions } = createReactiveMiddlewares(Tracker);

const enhancers = [
  applyMiddleware(sources, subscriptions, ReduxThunk, logger, routerMiddle),
];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = createStore(persistedReducer, {}, compose(...enhancers));

export const persistor = persistStore(Store);
