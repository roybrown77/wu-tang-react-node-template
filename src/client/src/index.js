import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Immutable from 'immutable';

import App from './containers/App';
import api from './middleware/api';
import rootReducer from './reducers';

const initialState = Immutable.Map();

const composeAll = process.env.NODE_ENV.toLowerCase() === 'development' ? composeWithDevTools : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeAll(
    applyMiddleware(
      thunkMiddleware,
      api
      )
  )
);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);