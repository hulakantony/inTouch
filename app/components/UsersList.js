import React from 'react';

export default function UsersList({users}) {
	return (
		<div className='users-list-wrap'>
			<ul>
				{
					users.users.map((el, i) => {
						return <li key={i} >{el}</li>
					})
				}
			</ul>
		</div>
	);
}