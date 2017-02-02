import { types } from '../consts/';
import { browserHistory } from 'react-router';


export function sendMessage(message, user) {
	return {
		type: types.SEND_MESSAGE,
		message,
		user
	}
}
export function recieveUser(user){
	return {
		type: types.USER_JOIN_SUCCESS,
		user
	}
}
export function userLogin(user){
	return (dispatch) => {
		fetch('http://localhost:8080/api/login',{
			method: 'post',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
			body: JSON.stringify(user)
		}).then(response => {
	        if(response.ok) {
	          localStorage.setItem('username', user.nickname);
	          dispatch(receiveUser(user.nickname));
	          browserHistory.push('/chat');
	        }
	      })
		.catch(error => {throw error});
	}
}