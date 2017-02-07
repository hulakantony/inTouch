import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, getActiveUsers } from '../actions/actions';
import { addUser, userLeftChat } from '../actions/userActions';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import UsersList from '../components/UsersList';
import io from 'socket.io-client';


class ChatContainer extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { getActiveUsers, socket } = this.props;		
		socket.on('chat message', this._messageRecieve.bind(this));
		socket.on('user left', this._userLeft.bind(this))
		socket.on('user joined', this._userJoined.bind(this));		
		getActiveUsers()
	}	
  	_userJoined(user){
  		const { addUser } = this.props;
  		addUser(user)
  	}
	_messageRecieve(message){	
		const { sendMessage } = this.props;		
		sendMessage(message);
	}	
	_userLeft(user){
		const { userLeftChat } = this.props;		
		userLeftChat(user)
	}
	componentWillUnmount(){		
		const { socket } = this.props;	
		const currentUser = this.props.users.currentUser;
		socket.emit('disconnect');
		socket.emit('user left', currentUser);
		socket.emit('stop typing', currentUser);
		socket.disconnect(true)		
	}
	messageSubmit(msg) {
		const { socket } = this.props;				
		socket.emit('chat message', msg);		
	}	
	render(){
		const { messages, users, socket, typers } = this.props;
		const user = this.props.users.currentUser;

		return (
			<div className="main-wrapper">	
				<UsersList users={users} currentUser={user}/>
				<div className="chat-container">
					<MessageList typers={typers} messages={messages} currentUser={user}/>
					<MessageForm socket={socket} messageSubmit={(m) => this.messageSubmit(m)} user={user}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
  return {    
    messages: state.messages,
    users: state.users,
    socket: state.socket,
    typers: state.typers
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, user) => dispatch(sendMessage(message, user)),
    addUser: (user) => dispatch(addUser(user)),
    getActiveUsers: () => dispatch(getActiveUsers()),
    userLeftChat: (user) => dispatch(userLeftChat(user))   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);