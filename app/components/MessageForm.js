import React, { PureComponent } from 'react';
import moment from 'moment';
import uuid from 'uuid';

let typingTimer;
export default class MessageForm extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			text: '',
			typing: false
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		const { text } = this.state;		
		const { messageSubmit, user, socket } = this.props;		
		if(text){
			const newMessage = {
		        id: `${Date.now()}${uuid.v4()}`,		        
		        text: text.trim(),
		        user: user,
		        time: moment().format("MM/DD/YYYY h:mm:ss")
      		};
      		socket.emit('stop typing', user);
			messageSubmit(newMessage);
			this.setState({ text: '', typing: false })
		} else {
			return;
		}		
	}
	handleKeyUp(){
		clearTimeout(typingTimer);
		typingTimer = setTimeout(this.doneTyping.bind(this), 2000)
	}
	handleKeyDown(){
		clearTimeout(typingTimer);
	}
	doneTyping(){
		const { socket, user } = this.props;		
		socket.emit('stop typing', user);
		this.setState({ typing: false })
	}
	handleChange(e){
		const { socket, user } = this.props;
		this.setState({text: e.target.value});
		 if (e.target.value.length > 0 && !this.state.typing) {
	    	socket.emit('typing', user);
	    	this.setState({ typing: true});
	    }
	    if (!e.target.value.length && this.state.typing) {	    	
	    	socket.emit('stop typing', user);
	    	this.setState({ typing: false});
	    }	    
	    
	}
	render(){
		return (
			<div className='message-form-wrap'>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group col-md-10">
						<input type="text" 
							   placeholder="Type your message" 
							   value={this.state.text} className="form-control" 
							   onKeyUp={() => this.handleKeyUp()} 
							   onKeyDown={() => this.handleKeyDown()} 
							   onChange={(e)=>this.handleChange(e)} />
					</div>
					<input className="btn btn-primary" type="submit" value="Send" />
				</form>
			</div>
		);
	}
	
}