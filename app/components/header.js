import React, { Component } from 'react';
import { Link } from 'react-router';


export default function Header () {
    return (
    	<div className="nav-holder">
    		<ul className="nav nav-pills">
                <li role="presentation"  >
	  				<Link to={  } activeClassName='active' >Sign In</Link>
	  			</li>
                <li role="presentation"  >
                    <Link to={  } activeClassName='active' >Login</Link>
                </li>
    	  	</ul> 
    	</div>
    )
}