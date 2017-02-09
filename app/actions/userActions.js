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
            console.log(response)
            return response.json();
        }
    })
        .then((response) => {
                    
            let token = response.token;
            let user = response.user.local;            
            let img = user.avatar.data.data;           
            let datajpg;
            if(!img.length){
              datajpg = 'https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png'
            } else {
              let b64encoded = btoa(String.fromCharCode.apply(null, img));
              datajpg = "data:image/jpg;base64," + b64encoded;
            }            
            let newUser = {
                email: user.email,
                nickname: user.nickname,
                avatar: datajpg
            };
            localStorage.setItem('chat-token', token);
            localStorage.setItem('chat-user', JSON.stringify(newUser));
            const socket = io('http://localhost:8080');
            dispatch(getSocket(socket));
            //socket.emit('user joined', newUser);
            debugger;
            dispatch(receiveLogin(newUser));
            browserHistory.push('/chat');
        })
        .catch(error => {            
            dispatch(loginError(error.message));
            debugger;
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

        debugger;
        //browserHistory.push('/chat');
    } else {
        return;
    }
}

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

export const userLogout = () => (dispatch) => {     
    dispatch(requestLogout());
    localStorage.removeItem('chat-token');
    localStorage.removeItem('chat-user');    
    fetch('http://localhost:8080/logout')       
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