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
	console.log('fetching')
	dispatch(getActiveUsersRequest())
	fetch('http://localhost:8080/users?active=true')
	.then(response => {
		console.log(response)
	    if (response.ok) {	    
	    	return response.json();	      
	    } else {
	      dispatch(getActiveUsersFailure(error))	      
    }})
    .then(users => {
    	const currentUser = getState().users.currentUser;
    	console.log(123, users)
    	const withoutMe = users.filter(el => {
    		console.log(el.local.nickname)
    		return el.local.nickname !== currentUser;
    	})
    	let usersNicknames = [];
    	withoutMe.forEach(el => {
    		usersNicknames.push(el.local.nickname);
    	})    	
    	dispatch(getActiveUsersSuccess(usersNicknames));
    })
    .catch(error => {
    	dispatch(getActiveUsersFailure(error))
    })
}

