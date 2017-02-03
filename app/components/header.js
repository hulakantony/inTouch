import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../styles/main.css';
import { userLeftChat, userLogout } from '../actions/userActions'

export default class Header extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { socket } = this.props;
        socket.on('user left', this._userLeft.bind(this));
    }
    _userLeft(user){
        const { userLeftChat } = this.props;        
        userLeftChat(user)
    }
    handleUserLogout(){
        const { socket, userLogout } = this.props;
        const currentUser = this.props.users.currentUser;        
        userLogout()
        localStorage.removeItem('username')
        socket.emit('user left', currentUser);
    }
    render() {
        const { isAuthenticated } = this.props.users;
        console.log('header-auth', isAuthenticated)
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="logo" activeClassName='active' >
                            <span className="logo-in">IN</span>
                            <span className="logo-touch">touch</span>
                        </div>
                        <ul className="nav nav-pills header-nav">
                            <li role="presentation"  >
                                <Link to={ '/chat' }  activeClassName='active' >Chat</Link>
                            </li>

                        { !isAuthenticated ?
                            <li role="presentation"  >
                                <Link to={ '/auth' } activeClassName='active' >Sign In</Link>
                            </li>
                            :
                            null
                        }
                            <li role="presentation"  >
                                {
                                    !isAuthenticated ? <Link to={ '/login' } activeClassName='active' >Login</Link>
                                    :
                                    <Link to={ '/login' } onClick={() => this.handleUserLogout()} activeClassName='active' >Logout</Link>
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
  return {    
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLeftChat: (user) => dispatch(userLeftChat(user)),
    userLogout: () => dispatch(userLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);