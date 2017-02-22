import React from 'react';

export default function Message({message, user, date, myMessage}) {
	const msgClassName = myMessage ? "message my-message" : "message other-message";
	const dataClassName = myMessage ? "message-data my-message-data" : "message-data other-message-data";
	const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	
	const imageRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(\.jp(e)?g|\.png|\.gif|\.)$/ig;	
	const isImage = imageRegex.test(message);
	const isLink = urlRegex.test(message);
	const renderValue = () => {
		if(isImage) {
			return (
				<div className="message-image-wrap">
					<a target="_blank" href={message}>
						<img src={message} className="message-image"/>
					</a>
				</div>
			)
		}
		if(isLink) {
			return (
				<a href={message} target="_blank">{message}</a>
			)
		}
		return `${message}`
	}
	return (
		<li className="clearfix">
			<div className={dataClassName}>
				<span className="message-data-name"><i className="fa fa-circle online"></i>{user}</span>
				<span className="message-data-time">{date}</span>
			</div>			
			<div className={msgClassName}>
				{
					renderValue()				
				}
			</div> 
		</li>
	)
} 