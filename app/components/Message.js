import React from 'react';

export default function Message({message, user, date}) {
	return (
		<li className="clearfix">
			<div className="message-data">
				<span className="message-data-name"><i className="fa fa-circle online"></i>{user}</span>
				<span className="message-data-time">{date.toLocaleString()}</span>
			</div>
			<div className="message my-message">
				{message}
			</div>
		</li>
	)
} 