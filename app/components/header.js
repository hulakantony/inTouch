import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/main.css';

export default function Header () {
    return (
    <nav className="navbar navbar-default">
    	<div className="container-fluid">
            <a href="/" className="logo">
                <span className="logo-in">IN</span>
                <span className="logo-touch">touch</span>
            </a>
    		<ul className="nav nav-pills header-nav">
                <li role="presentation"  >
	  				<Link to={ '/auth' } activeClassName='active' >Sign In</Link>
	  			</li>
                <li role="presentation"  >
                    <Link to={ '/login' } activeClassName='active' >Login</Link>
                </li>
    	  	</ul> 

    	</div>
    </nav>
    )
}

