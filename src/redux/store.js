import {createStore} from "redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from 'redux';

import rootReducer from "./reduces";

const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

    const enhancer = composeEnhancers(
      applyMiddleware(...middleware),
      // other store enhancers if any
    );


let store = createStore(rootReducer, enhancer);

export default store;