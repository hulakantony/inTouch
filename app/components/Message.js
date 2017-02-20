import React from 'react';

export default function Message({message, user, date, myMessage}) {
	const msgClassName = myMessage ? "message my-message" : "message other-message";
	const dataClassName = myMessage ? "message-data my-message-data" : "message-data other-message-data";
	const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;	
	return (
		<li className="clearfix">
			<div className={dataClassName}>
				<span className="message-data-name"><i className="fa fa-circle online"></i>{user}</span>
				<span className="message-data-time">{date}</span>
			</div>			
			<div className={msgClassName}>
				{urlRegex.test(message) ? 
					<div>
						<iframe src={message} width="200" height="150" allowTransparency></iframe>						
						<a target="_blank" href={message}> {message}</a> 
					</div> : 
					`${message}` 
				}
			</div> 

		</li>
	)
} 