import {combineReducers} from 'redux';
import {messages} from './reducers.js'
import users from './users';
import socket from './socket'
import signup from  './signUp'

const rootReducer = combineReducers({
	socket,
	users,
	signup,
	messages
});

export default rootReducer;