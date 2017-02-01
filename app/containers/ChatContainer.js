import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions'
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import io from 'socket.io-client';
const socket = io('http://localhost:8080/');
export default class ChatContainer extends Component {
	componentDidMount(){
		socket.on('chat message', this._messageRecieve.bind(this));
	}
  
	_messageRecieve(message){	
		const { sendMessage } = this.props;
		sendMessage(message, 'guest');
	}

	messageSubmit(msg) {		
		socket.emit('chat message', msg);		
	}
	render(){
		const { messages } = this.props;
		return (
			<div className="main-wrapper">				
				<MessageList messages={messages} />
				<MessageForm messageSubmit={(m) => this.messageSubmit(m)}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
  return {    
    messages: state.messages
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, user) => dispatch(sendMessage(message, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);