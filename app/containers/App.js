import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import '../styles/main.css'



export default class App extends Component {
	constructor(){
		super()		
	}
	// componentDidMount(){
	// 	socket.on('chat message', this._messageRecieve.bind(this));
	// }
  
	// _messageRecieve(message){	
	// 	const { sendMessage } = this.props;
	// 	sendMessage(message, 'guest');
	// }

	// messageSubmit(msg) {		
	// 	socket.emit('chat message', msg);		
	// }
	render(){  	
		return (
			<div>
				<Header/>
				<div className="content-wrap">				
					{this.props.children}
				</div>
			</div>
			
		)
	}
}
