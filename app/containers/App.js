import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { checkAuth } from '../actions/authActions';
import '../styles/main.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080/');
class App extends Component {
	constructor(){
		super()		
	}	
	render(){  	
		return (
			<div>
				<Header/>
				<div className="content-wrap clearfix">				
					{this.props.children && React.cloneElement(this.props.children, {
              socket: socket})}
				</div>
			</div>
			
		)
	}
}
const mapStateToProps = (state) => { 
  return {    
    messages: state.messages,
    users: state.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
