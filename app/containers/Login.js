import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default class Auth extends Component {

	render(){
		return (
		<div className="login-signin-wrap">
			<form className="col-md-4">
					<div className="form-group">
					    <input 
					    	className="form-control"
							placeholder="E-mail" 
							type="text" 
						/>
					</div>
					<div className="form-group">
					    <input 
					    	className="form-control" 
							placeholder="Password" 
							type="password" 
						/>
					</div>
					<button className="btn btn-primary">Login</button>
			</form>
			<button className="btn btn-primary"><i className="fa fa-vk" aria-hidden="true"></i></button>
		</div>
		)

	}
}




// const mapStateToProps = (state) => { 	
//   return {
   
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {

//    }
// }


//export default connect(mapStateToProps, mapDispatchToProps)(Auth);

