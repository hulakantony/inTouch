/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    currentUser: null,
    users: []
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };
        case types.LOGIN_SUCCESS:                   
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                currentUser: action.user
            };

        case types.LOGIN_FAILURE:
            debugger;
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };


        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                currentUser: null
            };
        
        case types.GET_ACTIVE_USERS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        
        case types.GET_ACTIVE_USERS_FAILURE:
            debugger;
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            };
        
        case types.GET_ACTIVE_USERS_SUCCESS:
            const currentUser = state.currentUser;
            action.users.unshift(currentUser)
            return {
                ...state,
                isFetching: false,
                users: action.users
            };
        
        case types.ADD_USER:
            const currentUserNickname = state.currentUser.nickname; 
            const checkUser = state.users.some(el => {
                return el.nickname === action.user.nickname;
            })
            if(currentUserNickname === action.user.nickname){ 
              return state;
            }
            if(checkUser){                                     
              return state;
            }
            return {
                ...state,
                users: [...state.users, action.user]
            };
        case types.NOT_ACTIVE_USERS:
            if(!action.users.length){
              return state;
            }
            var activeUsers = [];
           for(let i = 0; i<state.users.length; i++ ){
              for(let j = 0; j<action.users.length; j++){
                if(state.users[i].nickname !== action.users[j].local.nickname){
                  activeUsers.push(state.users[i]);
                }
              }
           }           
          return {
            ...state,
            users: activeUsers
          }
        // case types.USER_LEFT_CHAT:            
        //     let filteredUsers = state.users.filter((el,i,arr) => {
        //         return el.loggedCount >= 1                
        //     });            
        //     return {
        //         ...state,
        //         users: filteredUsers
        //     };
        default:
            return state
    }
};

export default users;