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
		const username = localStorage.getItem('username');	
		return (
			<div className='message-list clearfix' ref="messageList">
				<ul>
					{
						messages.map((el, i) => {
							const myMessage = username === el.user;
							return <Message key={i} date={el.time} message={el.text} user={el.user}  myMessage={myMessage}/>
						})
					}
				</ul>
			</div>
		)
	}
	
}