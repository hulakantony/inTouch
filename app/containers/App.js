import React, {Component} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080/');
export default class App extends Component {
	constructor(){
		super()
		this.state = {
			messages: [],
		}
	}
	componentDidMount(){
		socket.on('chat message', this.handleSubmit);
	}
	// _messageRecieve(message){
	// 	const { messages } = this.state;
	// 	messages.push(message);
	// 	this.setState({messages})

	// }
	handleSubmit(e) {
		e.preventDefault();
		const { text } = this.refs;
		const { messages } = this.state;
		messages.push(text.value);
		this.setState({messages})
		socket.emit('chat message', text.value.trim())
	}
	render(){
		const { messages } = this.state;
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" defaultValue=''  ref='text' />
				</form>
				<ul>
					{
						messages.map((el,i) => {
							return <li key={i}>{el}</li>
						})
					}
				</ul>
			</div>	
		)
	}
}