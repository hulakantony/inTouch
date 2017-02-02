import { combineReducers } from 'redux';
import { messages, users } from './reducers.js'

const rootReducer = combineReducers({  
	messages,
	users
});

export default rootReducer;