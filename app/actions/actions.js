import { types } from '../consts/';


export function sendMessage(message, user) {
	return {
		type: types.SEND_MESSAGE,
		message,
		user
	}
}

