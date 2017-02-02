import React from 'react';

export default function Message({message, user, date}) {
	const username = localStorage.getItem('username');
	const msgClassName = username === user ? "message my-message" : "message other-message";
	const dataClassName = username === user ? "message-data my-message-data" : "message-data other-message-data"
	return (
		<li className="clearfix">
			<div className={dataClassName}>
				<span className="message-data-name"><i className="fa fa-circle online"></i>{user}</span>
				<span className="message-data-time">{date}</span>
			</div>
			<div className={msgClassName}>
				{message}
			</div>
		</li>
	)
} 