/* eslint-disable no-underscore-dangle */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as alerts } from '../../lib/';

const rootReducer = combineReducers({
  // Add your other reducers here
  alerts,
});

let middlewares = applyMiddleware(thunk);

// Enable redux-dev-tools
// see https://github.com/zalmoxisus/redux-devtools-extension
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

const store = createStore(rootReducer, middlewares);

export default store;
export const dispatch = store.dispatch;
