import {combineReducers} from 'redux';
import {messages} from './reducers.js'
import user from './users';
import signup from  './signUp'

const rootReducer = combineReducers({
  user,
  signup,
  messages
});

export default rootReducer;