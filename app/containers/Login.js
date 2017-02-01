import React, { Component } from 'react';
// import { connect } from 'react-redux';

export default class Auth extends Component {

	render(){
		return (
		<div>
			<form className='auth-form'>
				<input type='text'  placeholder='nickname' />
				<input type='text'  placeholder='password' />
			</form>
			<button><i className="fa fa-vk" aria-hidden="true"></i></button>
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

