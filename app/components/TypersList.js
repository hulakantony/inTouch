import React from 'react';

export default function TypersList({typers}){
	const lessThenFour = (
		<span>
		{
			typers.map((typer, i, arr) => {
				const lastTyper = i === arr.length - 1;					
				return <span key={i}>{lastTyper ? `${typer} ` : `${typer}, `}</span>
			})
		}
		</span>
	)
	const several = (<span>Several users</span>);
	return (
		<div className='typers-list'>
			{typers.length < 4 ? lessThenFour: several}
			<span> are typing</span>
		</div>
	);
}