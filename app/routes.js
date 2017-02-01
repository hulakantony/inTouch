import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Auth from './containers/Auth';
import Login from './containers/Login';
import Header from './components/header'

export const routes = (
	<Route path='/' component={App}>

		<Route path='auth' component={Auth}/>
		<Route path='login' component={Login}/>				
	</Route>
)