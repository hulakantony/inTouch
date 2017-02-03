import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../styles/main.css';

export default class Header extends Component {
    
    render() {
        const { isAuthenticated } = this.props.users;
        console.log('header-auth', isAuthenticated)
        return (
            <div>
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
                                {
                                    !isAuthenticated ? <Link to={ '/login' } activeClassName='active' >Login</Link>
                                    :
                                    <Link to={ '/login' } activeClassName='active' >Logout</Link>
                                }

                                
                            </li>
                        </ul> 

                    </div>
                </nav>
            </div>
        ) 
    }

}

const mapStateToProps = (state) => { 
    console.log('header', state)
  return {    
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  // return {
  //   sendMessage: (message, user) => dispatch(sendMessage(message, user))
  // }
}

export default connect(mapStateToProps)(Header);