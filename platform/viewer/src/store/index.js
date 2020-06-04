import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
} from 'redux/es/redux.js';

// import { createLogger } from 'redux-logger';
import { reducer as oidcReducer } from 'redux-oidc';
import { redux } from '@ohif/core';
import thunkMiddleware from 'redux-thunk';
import workingListReducer from '../reducers/workingListReducer';
import landmarkReducer from '../reducers/landmarkReducer';
import referenceLinesReducer from '../reducers/referenceLinesReducer';

// Combine our @ohif/core and oidc reducers
// Set init data, using values found in localStorage
const { reducers, localStorage, sessionStorage } = redux;
const middleware = [thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

reducers.oidc = oidcReducer;
reducers.workingLists = workingListReducer;
reducers.landmark = landmarkReducer;
reducers.referenceLines = referenceLinesReducer;

const rootReducer = combineReducers(reducers);
const preloadedState = {
  ...localStorage.loadState(),
  ...sessionStorage.loadState(),
};

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
);

// When the store's preferences change,
// Update our cached preferences in localStorage
store.subscribe(() => {
  localStorage.saveState({
    preferences: store.getState().preferences,
  });
  sessionStorage.saveState({
    servers: store.getState().servers,
  });
});

export default store;
