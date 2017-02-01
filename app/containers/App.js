import React, {Component} from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions'

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
		socket.emit('chat message', text.value.trim());
		text.value = '';
	}
	render(){
		const { messages } = this.props;
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" defaultValue=''  ref='text' />
				</form>
				<ul>
					{
						messages.map((el,i) => {
							return <li key={i}><strong>{el.user}:</strong>  {el.message}</li>
						})
					}
				</ul>
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