import {types} from '../consts/';

const initialState = {
  message: ''
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        message: null
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        message: action.message
      };

    default:
      return state
  }

};


export default signup;