import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions/actions';

const socket = io('http://localhost:8080/');
export default class Login extends Component {
	componentDidMount(){
		socket.emit('user joined', this._userJoined)
	}
	_userJoined(user){
		const { userLogin } = this.props;
		userLogin(user)
	}
	handleSubmit(e, user){

	}
	render(){
		return (
		<div className="login-signin-wrap">
			<form className="col-md-4">
					<div className="form-group">
					    <input 
					    	className="form-control"
							placeholder="E-mail" 
							type="text" 
							ref="email"
						/>
					</div>
					<div className="form-group">
					    <input 
					    	className="form-control" 
							placeholder="Password" 
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
  	userLogin: (user) => dispatch(userLogin(user))
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

