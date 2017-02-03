import React, { PureComponent } from 'react';
import moment from 'moment';
import uuid from 'uuid';

export default class MessageForm extends PureComponent {
	constructor(props){
		super(props);
	}
	handleSubmit(e) {
		e.preventDefault();
		const { text } = this.refs;		
		const { messageSubmit, user } = this.props;
		console.log(666, user)
		if(text.value){
			const newMessage = {
		        id: `${Date.now()}${uuid.v4()}`,		        
		        text: text.value.trim(),
		        user: user,
		        time: moment().format("MM/DD/YYYY h:mm:ss")
      		};
			messageSubmit(newMessage);
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
					<div className="form-group col-md-10">
						<input type="text" placeholder="Type your message" className="form-control " defaultValue='' ref="text" />
					</div>
					<input className="btn btn-primary" type="submit" value="Send" />
				</form>
			</div>
		);
	}
	
}