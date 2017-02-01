import React, { PureComponent } from 'react';

export default class MessageForm extends PureComponent {
	constructor(props){
		super(props);
	}
	handleSubmit(e) {
		e.preventDefault();
		const { text } = this.refs;
		const { messageSubmit } = this.props;
		if(text.value){
			messageSubmit(text.value.trim());
			text.value = '';
		} else {
			return;
		}		
	}
	keypressHandle(e){
		if(e.which == 13) {
            e.preventDefault();
            this.handleSubmit(e)
        }
	}
	render(){
		return (
			<div className='message-form-wrap'>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" placeholder="Type your message" defaultValue='' ref="text" />
					<input type="submit" value="Send" />
				</form>
			</div>
		);
	}
	
}