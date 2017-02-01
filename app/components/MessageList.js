import React, { Component } from 'react';
import Message from './Message';

export default class MessageList extends Component{
	constructor(props){
		super(props);
	}
	componentDidUpdate(){
		const { messageList } = this.refs;
		messageList.scrollTop = messageList.scrollHeight;
	}
	render(){
		const { messages } = this.props;
		return (
			<div className='chat-wrapper' ref="messageList">
				<ul>
					{
						messages.map((el, i) => {
							return <Message key={i} date={el.date} message={el.message} user={el.user} />
						})
					}
				</ul>
			</div>
		)
	}
	
}