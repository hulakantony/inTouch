/**
 * Created by kate on 02/02/17.
 */
import { types } from '../consts/';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user:null
};

const user = (state = initialState, action) => {
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
        user: action.nickname
      };

    case types.LOGIN_FAILURE:
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
        user: null
      };

    default:
      return state
  }
};

export default user;