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
	   		dispatch(getActiveUsersFailure(error))       
	}})
	.then(users => {
		const currentUser = getState().users.currentUser;     
		const withoutMe = users.filter(el => {      
			return el.local.nickname !== currentUser.nickname;
		});
		let activeUsers = [];
		withoutMe.forEach(el => {
			let img = el.local.avatar.data.data;
			let datajpg;
			if(!img.length){
				datajpg = 'https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png'
			} else {
				let b64encoded;
				setTimeout(()=>{
					b64encoded = btoa(String.fromCharCode.apply(null, img));
					datajpg = "data:image/jpg;base64," + b64encoded;
				}, 0)			
											
			}

			activeUsers.push({
				email:el.local.email,
				nickname:el.local.nickname,
				avatar:datajpg
			});
			debugger;
		});	 
		dispatch(getActiveUsersSuccess(activeUsers));	 
	})
	.catch(error => {
	 dispatch(getActiveUsersFailure(error))
	})
	.then(response => {		
	    if (response.ok) {	    
	    	return response.json();	      
	    } else {
	      dispatch(getActiveUsersFailure(error))	      
    }})
    .then(users => {
    	const currentUser = getState().users.currentUser;    	
    	const withoutMe = users.filter(el => {    		
    		return el.local.nickname !== currentUser.nickname;
    	});
    	let activeUsers = [];
    	withoutMe.forEach(el => {
			
			let img = el.local.avatar.data.data;
			let datajpg;
			if(!img.length){
				datajpg = 'https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png'
			} else {
				let b64encoded = btoa(String.fromCharCode.apply(null, img));
				datajpg = "data:image/jpg;base64," + b64encoded;
			}
			activeUsers.push({
				email:el.local.email,
				nickname:el.local.nickname,
				avatar:datajpg
			});
    	})  ;
    	setTimeout(() => {
			dispatch(getActiveUsersSuccess(activeUsers));
    	}, 400) 	
    	
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



