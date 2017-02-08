import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { checkAuth } from '../actions/authActions';
import { userLeftChat, userLogout, initialAuth } from '../actions/userActions';
import { typing, stopTyping } from '../actions/actions'
import '../styles/main.css';
//import io from 'socket.io-client';

/*
TODO: onlogout clear store
*/
class App extends Component {
	constructor(){
		super()		
	}	
	componentDidMount(){		
		window.addEventListener('beforeunload', this.closeWindow.bind(this));
	}
	conmponentWiilUnmount(){
		window.removeEventListener('beforeunload', this.closeWindow.bind(this));
	}
	componentWillReceiveProps(nextProps){        
        if(this.props.socket !== nextProps.socket){           
            const { socket } = nextProps;
            socket.on('user left', this._userLeft.bind(this));
            socket.on('typing', this._userTyping.bind(this));
			socket.on('stop typing', this._userStopTyping.bind(this));			
        }
    }
    _userTyping(user){
		const { typing } = this.props;
		typing(user)
	}
	_userStopTyping(user){
		const { stopTyping } = this.props;
		stopTyping(user)
	}
	_userLeft(user){
		const { userLeftChat } = this.props;		
		userLeftChat(user)
	}	
	closeWindow(){		
		const { currentUser } = this.props.users;	
		const { userLogout, socket } = this.props;		
		socket.emit('user left', currentUser);
		socket.emit('stop typing', currentUser);
		socket.emit('disconnect')	
		socket.disconnect(true)							
	}
	render(){  	
		return (
			<div>
				<Header />
				<div className="content-wrap clearfix">				
					{this.props.children }
				</div>
			</div>
			
		)
	}
}
const mapStateToProps = (state) => {	
  return {   
    users: state.users,
    socket: state.socket
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()), 
    userLeftChat : (user) => dispatch(userLeftChat(user)),
    userLogout: () => dispatch(userLogout()),
    typing: (user) => dispatch(typing(user)),
    stopTyping: (user) => dispatch(stopTyping(user)),
    initialAuth: () => dispatch(initialAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
