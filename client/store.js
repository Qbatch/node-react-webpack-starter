import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers/index';

export const history = createHistory();

const middleware = routerMiddleware(history);

export const store = createStore(
  reducers,
  applyMiddleware(middleware, promise(), thunk, createLogger())
);
