import React from 'react';
import { Route, Redirect, IndexRoute, IndexRedirect } from 'react-router';
import App from './containers/App';
import Auth from './containers/Auth';
import Login from './containers/Login';
import Header from './components/header';
import ChatContainer from './containers/ChatContainer';
import { checkAuth } from './actions/authActions';



const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {  
    return replace('/auth')
  }
}
export const routes = (
	<Route path='/' component={App}>
		<IndexRedirect to='login' component={App} />
		<Route path='auth' component={Auth}/>
		<Route path='login' component={Login}/>	
		<Route path='chat' onEnter={requireAuth} component={ChatContainer}/>			
	</Route>
)
// 