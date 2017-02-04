import { types } from '../consts/'
const socket = (state = {}, action) => {
	switch(action.type){
		case types.GET_SOCKET:
			return action.socket;		
		default: 
			return state;
	} 
		
}
export default socket;