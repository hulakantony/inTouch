import React, { Component } from 'react';
import Message from './Message';
import TypersList from './TypersList';

export default class MessageList extends Component{
	constructor(props){
		super(props);
	}
	componentDidUpdate(){
		const { messageList } = this.refs;
		messageList.scrollTop = messageList.scrollHeight;
	}
	render(){
		const { messages, currentUser, typers } = this.props;		
		return (
			<div className='message-list clearfix' ref="messageList">
				<ul>
					{
						messages.map((el, i) => {
							const myMessage = currentUser === el.user;
							return <Message key={i} date={el.time} message={el.text} user={el.user}  myMessage={myMessage}/>
						})
					}
				</ul>
				{typers.length ? <TypersList typers={typers}/> : null}
			</div>
		)
	}
	
}