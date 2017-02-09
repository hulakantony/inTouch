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
            return {
                ...state,
                users: [...state.users, action.user]
            };
        
        case types.USER_LEFT_CHAT:       
            const users = state.users.slice();
            const currUser = action.user;
            const filteredUsers = users.filter(el => {
                return el.nickname !== currUser.nickname;
            });
            return {
                ...state,
                users: filteredUsers
            };
        default:
            return state
    }
};

export default users;