import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MuiThemeProvider, createTheme} from '@material-ui/core/styles';

import Home from './pages/Home.jsx';

import './index.css';

const theme = createTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  typography: {
    useNextVariants: true
  }
});

render(
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
    </MuiThemeProvider>,
    document.getElementById('root')
);