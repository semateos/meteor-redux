import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = createStore(persistedReducer, {}, compose(...enhancers));

export const persistor = persistStore(Store);
