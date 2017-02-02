import React from 'react';

export default function UsersList({users}) {
	return (
		<div className='users-list-wrap'>
			<ul>
				{
					users.map((el, i) => {
						return <li key={i} >{user}</li>
					})
				}
			</ul>
		</div>
	);
}