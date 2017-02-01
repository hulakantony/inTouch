import { combineReducers } from 'redux';
import { messages } from './reducers.js'

const rootReducer = combineReducers({  
	messages
});

export default rootReducer;