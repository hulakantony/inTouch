/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';
import {browserHistory} from 'react-router';


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

const requestLogout = ()=> ({
  type: types.LOGOUT_SUCCESS
});

export const loginUser = (creds, socket)=> dispatch => {
  dispatch(requestLogin());

  fetch('http://localhost:8080/login', {
    method: 'post',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  }).then(response => {
    if (response.ok) {
      console.log(response)
      return response.json();
    }else{
      dispatch(loginError(error))
      console.log(55, response)
    }
  }).then((response)=>{    
    let user = response.user.local;    
    localStorage.setItem('username', user.nickname);  
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
export const userLeftChat = () => (dispatch, getState) => {
  const currentUser = getState().users.currentUser;
  dispatch({
    type: types.USER_LEFT_CHAT,
    currentUser
  })
}




