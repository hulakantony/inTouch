import {types} from '../consts/';

const initialState = {
  message: ''
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        message:'User is created!'
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        message:'Ups! Something wrong'
      };

    default:
      return state
  }

};


export default signup;