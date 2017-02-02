import React from 'react';

export default function UsersList({users, currentUser}) {
	return (
		<div className='users-list-wrap'>
			<ul>
				{
					users.users.map((el, i) => {
						const userColor = el === currentUser ? 'user-me' : 'user-other';
						return <li key={i} className={userColor} >{el}</li>
					})
				}
			</ul>
		</div>
	);
}