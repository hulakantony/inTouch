import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { browserHistory } from 'react-router'



export default class Login extends Component {
	constructor(props){
		super(props)
	}	
	handleSubmit(e){
	    e.preventDefault();
	    const { socket, loginUser } = this.props;
	    const { email, password } = this.refs;
	    const newUser = {
	      email: email.value,
	      password: password.value
	    };	
	    loginUser(newUser, socket);    
	}
	render(){
		return (
		<div className="login-signin-wrap">
			<form className="col-md-4" onSubmit={(e)=>this.handleSubmit(e)} >
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
			
		</div>
		)
	}
}




const mapStateToProps = (state) => { 
console.log(state)	
  return {
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user, socket) => dispatch(loginUser(user, socket)),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

// <button className="btn btn-primary"><i className="fa fa-vk" aria-hidden="true"></i></button>