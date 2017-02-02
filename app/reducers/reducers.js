import { types } from '../consts/';
const initialMessages = [];

export function messages (state = initialMessages, action){
	switch(action.type){
		case types.SEND_MESSAGE:
			return [...state, {message: action.message, user: action.user, date: new Date()}];
		default: 
			return state;
	}
}

const initialUsers = [];
export function users (state = initialUsers, action){
	switch(action.type){
		case types.USER_JOIN_SUCCESS:
			return [...state, action.user];
		default: 
			return state;
	}
}