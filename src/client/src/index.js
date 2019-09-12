import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import Immutable from 'immutable';

import api from './middleware/api';
import rootReducer from './reducers';
import HomePage from './containers/HomePage';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
  useNextVariants: true
  }
});

const history = createHistory();

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
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
          <div className="App">
              <main>
                  <Switch>
                      <Route exact path='/' component={HomePage}/>
                  </Switch>
              </main>
          </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);