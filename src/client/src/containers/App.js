import React from 'react';
import PropTypes from 'prop-types';
import routes from '../routes';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const App = () => {
  return (
    <Router history={history}>
    	{routes}
    </Router>
  )
}

App.propTypes = {
  history: PropTypes.object
};

export default App;