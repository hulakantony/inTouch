import { types } from '../consts/';
const initialMessages = [];

export function messages (state = initialMessages, action){
	switch(action.type){
		case types.SEND_MESSAGE:
			return [...state, {message: action.message, user: action.user}];
		default: 
			return state;
	}
}