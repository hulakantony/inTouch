/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';
import {browserHistory} from 'react-router';
import io from 'socket.io-client';

const requestLogin = ()=> ({
  type: types.LOGIN_REQUEST  
});

const receiveLogin = (user)=>{
  return {
    type: types.LOGIN_SUCCESS,   
    nickname: user
  }  
};

const loginError = (message)=> ({
  type: types.LOGIN_FAILURE,  
  message
});

export const requestLogout = ()=> ({
  type: types.LOGOUT_SUCCESS
});
export const getSocket = socket => ({
  type: types.GET_SOCKET,
  socket
})
export const loginUser = (creds)=> dispatch => {
  dispatch(requestLogin());

  fetch('http://localhost:8080/login', {
    method: 'post',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  }).then(response => {
    if (response.ok) {      
      return response.json();
    }else{
      dispatch(loginError(error))      
    }
  }).then((response)=>{    
    let user = response.user.local;    
    localStorage.setItem('username', user.nickname); 
    const socket = io('http://localhost:8080');
    dispatch(getSocket(socket))  
    socket.emit('user joined', user.nickname);
    dispatch(receiveLogin(user.nickname));    
    browserHistory.push('/chat');
  })
    .catch(error => {
      dispatch(loginError(error))
    });
};

export const addUser = (user) => dispatch => {
  dispatch({
    type: types.ADD_USER,
    user
  })
}

export const userLeftChat = (user) => (dispatch) => {   
  dispatch({
    type: types.USER_LEFT_CHAT,
    user
  })
}

export const userLogout = () => (dispatch, getState) => {
   dispatch(requestLogout())
  fetch('http://localhost:8080/logout')
    .then(response => {
      if (response.ok){        
        //dispatch(requestLogout())
      }
    })
    .catch(err => {throw err;})
}



