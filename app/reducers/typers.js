import { types } from '../consts/';

const initialState = [];
const typers = (state = initialState, action) => {
  switch (action.type) {
  case types.TYPING:
    if (state.indexOf(action.username) === - 1) {
      return [...state, action.username];
    }
    return state;
  case types.STOP_TYPING:
    return state.filter(user =>
      user !== action.username
    );
  default:
    return state;
  }
}
export default typers;