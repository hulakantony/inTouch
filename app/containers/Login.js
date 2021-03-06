import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/userActions';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux'


export default class Login extends Component {
	constructor(props){
		super(props)
	}	
	handleSubmit(e){
	    e.preventDefault();
	    const { loginUser } = this.props;
	    const { email, password } = this.refs;
	    const newUser = {
	      email: email.value,
	      password: password.value
	    };	
	    loginUser(newUser);    
	}
	render(){
		const { errorMessage } = this.props.users;
		console.log('error: ', errorMessage)
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
					{
						errorMessage && <div className="alert alert-danger" >{ errorMessage }</div>
					}
					
					<button className="btn btn-primary">Login</button>
			</form>
			
		</div>
		)
	}
}


const mapStateToProps = ({users}) =>({
    users
});

const mapDispatchToProps = (dispatch) =>(
    bindActionCreators({loginUser}, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Login);
