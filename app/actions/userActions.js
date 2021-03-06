/**
 * Created by kate on 02/02/17.
 */
import {
    types
} from '../consts/';
import {
    browserHistory
} from 'react-router';
import io from 'socket.io-client';

const requestLogin = () => ({
    type: types.LOGIN_REQUEST
});

const receiveLogin = (user) => {
    console.log('recieve login')
    return {
        type: types.LOGIN_SUCCESS,
        user
    }
};

const loginError = (message) => ({
    type: types.LOGIN_FAILURE,
    message
});

export const requestLogout = () => ({
    type: types.LOGOUT_SUCCESS
});
export const getSocket = socket => ({
    type: types.GET_SOCKET,
    socket
});


export const loginUser = (creds) => dispatch => {
    dispatch(requestLogin());

    fetch('http://localhost:8080/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }).then(response => {
        console.log(response)
        if (!response.ok) {
            var res = response.json();
            return res.then(res => {
                var error = res.message;
                throw new Error(error);
            })

        } else {           
            return response.json();
        }
    })
        .then((response) => {           
            let token = response.token;
            let user = response.user.local;            
            let userId = response.user._id;           
            let imageUrl = `http://localhost:8080/users/photo/${userId}`;          
           
            let newUser = {
                email: user.email,
                nickname: user.nickname,
                avatar: imageUrl,
                loggedCount: 1
            };
            localStorage.setItem('chat-token', token);
            localStorage.setItem('chat-user', JSON.stringify(newUser));
            const socket = io('http://localhost:8080');
            dispatch(getSocket(socket));           
            dispatch(receiveLogin(newUser));
            browserHistory.push('/chat');
        })
        .catch(error => {            
            dispatch(loginError(error.message));           
        });
};

export const initialAuth = () => dispatch => {
    //dispatch(requestLogin());
    console.log('init');
    const user = JSON.parse(localStorage.getItem('chat-user'));   
    if (user) {
        const socket = io('http://localhost:8080');
        dispatch(getSocket(socket));
        dispatch(receiveLogin(user));
        socket.emit('user joined', user); 
       
        //browserHistory.push('/chat');
    } else {
        return;
    }
}

export const addUser = (user) => dispatch => {
    dispatch({
        type: types.ADD_USER,
        user: {...user, loggedCount: 1 }
    })
}

export const userLeftChat = (user) => (dispatch) => {
  dispatch({
      type: types.USER_LEFT_CHAT,
      user
  })
}
const notAvtiveUsersList = (users) => dispatch => {
  dispatch({
    type: types.NOT_ACTIVE_USERS,
    users
  })
}
export const fetchNotActiveUsers = () => dispatch =>{  
  console.log('feeeetch')
  const token = localStorage.getItem('chat-token')
  fetch('http://localhost:8080/users?active=false',{
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
     dispatch(notAvtiveUsersList(users))
  })
  .catch(error => {
    throw error;
  })
  
}

export const userLogout = () => (dispatch) => {     
    dispatch(requestLogout());
    localStorage.removeItem('chat-token');
    localStorage.removeItem('chat-user');    
    fetch('http://localhost:8080/logout')       
        .then(response => {              
          return response.json();            
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            throw err;
        })
}