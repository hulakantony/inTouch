import React from 'react';
import Message from './Message';

export default function MessageList({messages}) {
	return (
		<div className='chat-wrapper'>
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