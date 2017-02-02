/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';
import {browserHistory} from 'react-router';


const requestLogin = (creds)=> ({
  type: types.LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const receiveLogin = (user)=>({
  type: types.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  user: user
});

const loginError = (message)=> ({
  type: types.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

const requestLogout = ()=> ({
  type: types.LOGOUT_SUCCESS
});

export const loginUser = (creds)=> dispatch => {

  dispatch(requestLogin(creds));

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
    console.log(response);
    let user = response.user.local;
    localStorage.setItem('username', user.nickname);
    console.log(user.nickname);
    dispatch(receiveLogin(user.nickname));
    browserHistory.push('/chat');
  })
    .catch(error => {
      dispatch(loginError(error))
    });
};



