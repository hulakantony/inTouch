import { types } from '../consts/';
const initialMessages = [];

export function messages (state = initialMessages, action){
	switch(action.type){
		case types.SEND_MESSAGE:
			return [...state, action.message];
		default: 
			return state;
	}
}
