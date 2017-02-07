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
    return {
        type: types.LOGIN_SUCCESS,
        nickname: user
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
})



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
                console.log(response)
                return response.json();
            }
        }) 
        .then((response) => {
            console.log('in OK section');
            let user = response.user.local;
            localStorage.setItem('username', user.nickname);
            const socket = io('http://localhost:8080');
            dispatch(getSocket(socket))
            socket.emit('user joined', user.nickname);
            dispatch(receiveLogin(user.nickname));
            browserHistory.push('/chat');

        })
        .catch(error => {
            console.log(error.message);
            dispatch(loginError(error.message));
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
    const user = getState().users.currentUser;
    const userObj = {
        user: user
    };
    dispatch(requestLogout())
    console.log(111, user)
    fetch('http://localhost:8080/logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                //dispatch(requestLogout())
                return response.json();
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            throw err;
        })
}