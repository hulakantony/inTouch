/**
 * Created by kate on 02/02/17.
 */
import { types } from '../consts/';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  currentUser: null,
  users: []
};

const users = (state = initialState, action) => {  
  switch (action.type) {
    case types.LOGIN_REQUEST:
    console.log(1, action)
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case types.LOGIN_SUCCESS: 
    console.log(2, action)    
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        currentUser: action.nickname
      };

    case types.LOGIN_FAILURE:
    console.log(3, action)
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };

    case types.LOGOUT_SUCCESS:
    console.log(4, action)
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        currentUser: null
      };
    case types.GET_ACTIVE_USERS_REQUEST:
    console.log(5, action) 
      return {
        ...state,
        isFetching: true
      }
    case types.GET_ACTIVE_USERS_FAILURE:
    console.log(6, action)
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }
    case types.GET_ACTIVE_USERS_SUCCESS:
      console.log(7, action)
      return {
        ...state,
        isFetching: false,
        users: [...state.users, ...action.users]
      }
    case types.ADD_USER:
    console.log(8, action)
      return {
        ...state,
        users: [...state.users, action.user]
      }
    case types.USER_LEFT_CHAT: 
      console.log(9 , action)
      console.log(state)
      const users = state.users.slice();    
      const currUser = action.user;
      const filteredUsers = users.filter(el => {
        return el !== currUser;
      })
      return {
        ...state,
        users: filteredUsers
      }
    default:
      return state
  }
};

export default users;