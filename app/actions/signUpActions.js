/**
 * Created by kate on 02/02/17.
 */
import {types} from '../consts/';
import {browserHistory} from 'react-router';

//SignUp

const signUpError = (message)=> ({
  type: types.SIGNUP_FAILURE,
  message
});

const signUpSuccess = (message)=> ({
  type: types.SIGNUP_SUCCESS
});


export const signUpUser = (creds)=> dispatch => {
    console.log('insign up');
    debugger;
    fetch('http://localhost:8080/signup', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
        },
        body: creds
    }).then(response => {
        if (!response.ok) {
            let res = response.json();
            return res.then(error=> {
                throw new Error(error);
            });
        } else {
            return response.json();
        }
    }).then((response)=> {
        dispatch(signUpSuccess());
        browserHistory.push('/login');
    }).catch(error => {
        dispatch(signUpError(error))
    });
}; 

