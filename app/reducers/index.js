import {combineReducers} from 'redux';
import {messages} from './reducers.js'
import users from './users';
import signup from  './signUp'

const rootReducer = combineReducers({
  users,
  signup,
  messages
});

export default rootReducer;