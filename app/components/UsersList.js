import React from 'react';

export default function UsersList({users, currentUser}) {
	console.log(users)
    return (
        <div className='users-list-wrap'>
            <ul>
                {
                    users.users.map((el, i) => {

                        const userColor = el.nickname === currentUser.nickname ? 'user-me' : 'user-other';                        
                        return (<li key={i} className={userColor}>
                            <div className="user-avatar">
                                <img src={el.avatar} alt="avatar"/>
                            </div>
                            <div className="about">
                                <span className="name">{el.nickname}</span>
                                <span className="status">
                                    <i className="fa fa-circle online"></i> online
                                </span>
                            </div>
                        </li>)
                    })
                }
            </ul>
        </div>
    );
}