import React from 'react'
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HomePage from '../containers/HomePage';

const routes = (
		 <MuiThemeProvider>
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