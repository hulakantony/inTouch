import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

import io from 'socket.io-client';
const socket = io('http://localhost:8080/');

export default class Login extends Component {
	componentDidMount(){
    socket.on('user joined', this._userJoined.bind(this))
	}
	_userJoined(user){
		const { loginUser } = this.props;
    loginUser(user)
	}
	handleSubmit(e){
    e.preventDefault();
    const { email, password } = this.refs;
    const newUser = {
      email: email.value,
      password: password.value
    };
    socket.emit('user joined', newUser);
	}
	render(){
		return (
		<div className="login-signin-wrap">
			<form className="col-md-4" onSubmit={(e)=>this.handleSubmit(e)} method="post" action="http://localhost:8080/login">
					<div className="form-group">
					    <input 
					    	className="form-control"
							placeholder="E-mail" 
							type="text" 
								name="email"
							ref="email"
						/>
					</div>
					<div className="form-group">
					    <input 
					    	className="form-control" 
							placeholder="Password" 
								name="password"
							type="password" 
							ref="password"
						/>
					</div>
					<button className="btn btn-primary">Login</button>
			</form>
			<button className="btn btn-primary"><i className="fa fa-vk" aria-hidden="true"></i></button>
		</div>
		)
	}
}




const mapStateToProps = (state) => { 	
  return {
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user))
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

