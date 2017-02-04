import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { checkAuth } from '../actions/authActions';
import { userLeftChat, userLogout } from '../actions/userActions';
import '../styles/main.css';
//import io from 'socket.io-client';


class App extends Component {
	constructor(){
		super()		
	}	
	componentDidMount(){
		window.addEventListener('unload', this.closeWindow.bind(this))
	}
	conmponentWiilUnmount(){
		window.removeEventListener('unload', this.closeWindow.bind(this))
	}
	componentWillReceiveProps(nextProps){        
        if(this.props.socket !== nextProps.socket){           
            const { socket } = nextProps;
            socket.on('user left', this._userLeft.bind(this));
        }
    }
	_userLeft(user){
		const { userLeftChat } = this.props;		
		userLeftChat(user)
	}
	userLogout(){
		const { userLogout } = this.props;
		userLogout();
	}
	closeWindow(){		
		const currentUser = this.props.users.currentUser;	
		const {userLogout, socket} = this.props;	
		localStorage.removeItem('username');
		socket.emit('user left', currentUser);
		userLogout()		
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
    userLogout: () => dispatch(userLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
