import React, {Component} from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions'
import MessageList from '../components/MessageList';
import '../styles/main.css'

const socket = io('http://localhost:8080/');
export default class App extends Component {
	constructor(){
		super()		
	}
	componentDidMount(){
		socket.on('chat message', this._messageRecieve.bind(this));
	}
	_messageRecieve(message){	
		const { sendMessage } = this.props;
		sendMessage(message, 'guest');
	}

	handleSubmit(e) {
		e.preventDefault();
		const { text } = this.refs;	
		if(text.value) 	{
			socket.emit('chat message', text.value.trim());
			text.value = '';
		} else {
			return;
		}
		
	}
	render(){
		const { messages } = this.props;
		return (
			<div className="main-wrapper">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" defaultValue=''  ref='text' />
				</form>
				<MessageList messages={messages} />
			</div>	
		)
	}
}
const mapStateToProps = (state) => { 
  return {    
    messages: state.messages,    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, user) => dispatch(sendMessage(message, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);