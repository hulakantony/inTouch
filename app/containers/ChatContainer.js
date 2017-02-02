import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions'
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
	}
  
	_messageRecieve(message, user){	
		const { sendMessage } = this.props;
		const currentUser = this.props.users.currentUser;		
		sendMessage(message, currentUser);
	}

	messageSubmit(msg) {
		const { socket } = this.props;
		const currentUser = this.props.users.currentUser;		
		socket.emit('chat message', msg, currentUser);		
	}
	render(){
		const { messages, users } = this.props;
		return (
			<div className="main-wrapper">	
				<UsersList users={users} />
				<MessageList messages={messages} />
				<MessageForm messageSubmit={(m) => this.messageSubmit(m)}/>
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
    sendMessage: (message, user) => dispatch(sendMessage(message, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);