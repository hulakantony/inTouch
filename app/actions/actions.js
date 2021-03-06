import { types } from '../consts/';


export function sendMessage(message) {
	return {
		type: types.SEND_MESSAGE,
		message		
	}
}

const getActiveUsersFailure = (message) => ({
	type: types.GET_ACTIVE_USERS_FAILURE,
	message
})

const getActiveUsersRequest = ()=> ({
  type: types.GET_ACTIVE_USERS_REQUEST  
});

const getActiveUsersSuccess = (users)=>{
  return {
    type: types.GET_ACTIVE_USERS_SUCCESS,   
    users
  }  
};

export const getActiveUsers = () => (dispatch, getState) =>{ 
	dispatch(getActiveUsersRequest())
	const token = localStorage.getItem('chat-token')
	fetch('http://localhost:8080/users?active=true',{
		method: 'get',
		headers: {'x-access-token': token}
	})
	.then(response => {	
		if (response.ok) {     
			return response.json();       
	 	} else {
	 		const error = response.message;
	   		throw new Error(error);
	}})
	.then(users => {
		
		const currentUser = getState().users.currentUser;     
		const withoutMe = users.filter(el => {      
			return el.local.nickname !== currentUser.nickname;
		});
		let activeUsers = [];
		withoutMe.forEach(el => {
			let userId = el._id;           
            let imageUrl = `http://localhost:8080/users/photo/${userId}`;					

			activeUsers.push({
				email:el.local.email,
				nickname:el.local.nickname,
				avatar:imageUrl,
				loggedCount: 1
			});
			
		});	 
		dispatch(getActiveUsersSuccess(activeUsers));	 
	})
	.catch(error => {
		dispatch(getActiveUsersFailure(error))
	})
	
}

export const typing = username => {
  return {
    type: types.TYPING,
    username
  };
}

export const stopTyping = username => {
  console.log(username)
  return {
    type: types.STOP_TYPING,
    username
  };
}



