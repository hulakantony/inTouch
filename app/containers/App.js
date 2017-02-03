import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { checkAuth } from '../actions/authActions';
import { userLeftChat } from '../actions/userActions';
import '../styles/main.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080/');
class App extends Component {
	constructor(){
		super()		
	}	
	componentDidMount(){
		socket.on('user left', this._userLeft.bind(this))
	}
	_userLeft(user){
		const { userLeftChat } = this.props;		
		userLeftChat(user)
	}
	componentWillUnmount(){
		const currentUser = this.props.users.currentUser;
		localStorage.removeItem('username');
		socket.emit('user left', currentUser);
	}
	render(){  	
		return (
			<div>
				<Header socket={socket}/>
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
    userLeftChat : (user) => dispatch(userLeftChat(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
