/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';
import {browserHistory} from 'react-router';

//SignUp

const signUpError = ()=> ({
  type: types.SIGNUP_FAILURE
});

const signUpSuccess = (message)=> ({
  type: types.SIGNUP_SUCCESS
});


export const signUpUser = (creds)=> dispatch => {
  console.log('insign up');
  fetch('http://localhost:8080/signup', {
    method: 'post',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  }).then(response => {    
    if (response.ok) {
      return response.json();
    }else{
      dispatch(signUpError(error))
    }
  }).then((response)=>{    
    dispatch(signUpSuccess());
    browserHistory.push('/login');
  })
    .catch(error => {
      dispatch(signUpError(error))
    });
}; 

