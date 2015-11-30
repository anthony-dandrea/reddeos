import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from 'reducers/';

if (__DEV__) {
  // Dev environment has logging enabled
  var createLogger = require('redux-logger');
  var loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });
  // Use localStorage for state on Dev
  // Unless we need it for prod in the future
  var localStorageMiddleWare = (store) => (next) => (action) => {
    var result = next(action);
    window.localStorage.setItem('state', JSON.stringify(store.getState()));
    return result;
  };
  var customCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    localStorageMiddleWare
  )(createStore);
} else {
  // Production turns off logging
  var customCreateStore = applyMiddleware(
    thunkMiddleware
  )(createStore);
}

// Not sure if we want to save state on reload
// var initialState = JSON.parse(window.localStorage.getItem('state')) || {};
var initialState = {};

let store = customCreateStore(rootReducer, initialState);
export {store};
