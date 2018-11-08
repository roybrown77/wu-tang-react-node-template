import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import HomePage from '../containers/HomePage';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
	useNextVariants: true
  }
});

const routes = (
	<MuiThemeProvider theme={theme}>
	    <div className="App">
	        <main>
	            <Switch>
	                <Route exact path='/' component={HomePage}/>
	            </Switch>
	        </main>
	    </div>
	</MuiThemeProvider>
)

export default routes;