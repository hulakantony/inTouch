import {combineReducers} from 'redux';
import {messages} from './reducers.js'
import users from './users';
import socket from './socket';
import signup from  './signUp';
import typers from './typers';

const rootReducer = combineReducers({
	socket,
	users,
	signup,
	messages,
	typers
});

export default rootReducer;