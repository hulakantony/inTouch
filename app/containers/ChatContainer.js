import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, addUser } from '../actions/actions'
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import UsersList from '../components/UsersList';



export default class ChatContainer extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { socket } = this.props;
		socket.on('chat message', this._messageRecieve.bind(this));
		socket.on('user joined', this._userJoined.bind(this))
	}
  	_userJoined(user){
  		const { addUser } = this.props;
  		addUser(user)
  	}
	_messageRecieve(message){	
		const { sendMessage } = this.props;		
		sendMessage(message);
	}

	messageSubmit(msg) {
		const { socket } = this.props;				
		socket.emit('chat message', msg);		
	}
	render(){
		const { messages, users } = this.props;
		const user = this.props.users.currentUser;

		return (
			<div className="main-wrapper">	
				<UsersList users={users} />
				<MessageList messages={messages}/>
				<MessageForm messageSubmit={(m) => this.messageSubmit(m)} user={user}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
	console.log(123, state)
  return {    
    messages: state.messages,
    users: state.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, user) => dispatch(sendMessage(message, user)),
    addUser: (user) => dispatch(addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);