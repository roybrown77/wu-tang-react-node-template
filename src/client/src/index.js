import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import rootReducer from './reducers';
import api from './middleware/api';
import Home from './pages/Home';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    useNextVariants: true
  }
});

const middlewareList = [thunk, api];

const devEnhancer = composeWithDevTools(applyMiddleware(...middlewareList));

const prodEnhancer = compose(applyMiddleware(...middlewareList));

const enhancer = process.env.NODE_ENV.toLowerCase() === 'development' ? devEnhancer : prodEnhancer;

const store = createStore(rootReducer,enhancer);

render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
            <main>
              <Switch>
                  <Route path='/' component={Home}/>
              </Switch>
            </main>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);