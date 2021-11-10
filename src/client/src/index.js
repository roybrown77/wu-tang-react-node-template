import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { MuiThemeProvider, createTheme} from '@material-ui/core/styles';

import rootReducer from './reducers';
import api from './middleware/api';
import Home from './pages/Home';

import './index.css';

const theme = createTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
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
    <MuiThemeProvider theme={theme}>
      <div className="App">
          <main>
            <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home/>}/>
              </Routes>
            </BrowserRouter>
          </main>
      </div>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);