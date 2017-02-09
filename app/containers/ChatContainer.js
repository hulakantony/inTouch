import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, getActiveUsers } from '../actions/actions';
import { addUser, userLeftChat, initialAuth } from '../actions/userActions';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import UsersList from '../components/UsersList';
import io from 'socket.io-client';
import Spinner from '../components/Spinner';

class ChatContainer extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		const { initialAuth } = this.props;
		initialAuth()
		console.log(555, this.props)
		debugger;
	}
	componentDidMount(){
		const { getActiveUsers } = this.props;	
		//debugger;				
		getActiveUsers();
		debugger;
	}	
	componentWillReceiveProps(nextProps){        
        if(this.props.socket !== nextProps.socket){            
            const { socket } = nextProps;
            socket.on('chat message', this._messageRecieve.bind(this));
			socket.on('user left', this._userLeft.bind(this))
			socket.on('user joined', this._userJoined.bind(this));
        }
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
		socket.emit('user left', currentUser);
		socket.emit('stop typing', currentUser.nickname);
		socket.emit('disconnect');
		socket.disconnect(true)		
	}
	messageSubmit(msg) {
		const { socket } = this.props;				
		socket.emit('chat message', msg);		
	}	
	render(){
		const { messages, users, socket, typers, isFetching } = this.props;
		const user = this.props.users.currentUser;		
		
		if(isFetching || !user){
			return <Spinner/>
		}
		return (
			<div className="main-wrapper">	
				<UsersList users={users} currentUser={user}/>
				<div className="chat-container">
					<MessageList typers={typers} messages={messages} currentUser={user.nickname}/>
					<MessageForm socket={socket} messageSubmit={(m) => this.messageSubmit(m)} user={user.nickname}/>
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
    typers: state.typers,
    isFetching: state.users.isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, user) => dispatch(sendMessage(message, user)),
    addUser: (user) => dispatch(addUser(user)),
    getActiveUsers: () => dispatch(getActiveUsers()),
    userLeftChat: (user) => dispatch(userLeftChat(user)),  
    initialAuth: () => dispatch(initialAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);