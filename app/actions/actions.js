import { types } from '../consts/';


export function sendMessage(message) {
	return {
		type: types.SEND_MESSAGE,
		message		
	}
}

