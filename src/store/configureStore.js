import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger'
let initial = {
  auth: {
    deviceId: "123"
  }
}
const configureStore = (initialState = initial) => {
  let middleware;
  let logger = createLogger();
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(applyMiddleware(thunk, logger));
  } else {
    middleware = applyMiddleware(thunk);
  }

  return createStore(rootReducer, initialState, middleware);
};

export default configureStore;
