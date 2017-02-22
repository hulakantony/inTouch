import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../styles/main.css';
import { userLeftChat, userLogout, fetchNotActiveUsers } from '../actions/userActions';
import { browserHistory } from 'react-router';

export default class Header extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){        
        if(this.props.socket !== nextProps.socket){            
            const { socket } = nextProps;
            //socket.on('user left', this._userLeft.bind(this));
        }
    }
    _userLeft(user){
        const { userLeftChat } = this.props;        
        userLeftChat(user)
    }
    fetchNotActiveUsers(){
        const { getActiveUsers } = this.props;
        getActiveUsers()
    }
    handleUserLogout(){
        const { userLogout, socket } = this.props;
        const currentUser = this.props.users.currentUser; 
        //socket.emit('user left', currentUser); 
        socket.emit('stop typing', currentUser.nickname);    
        //this.fetchNotActiveUsers()     
        userLogout();
        browserHistory.push('/login');              
    }
    render() {
        const { isAuthenticated } = this.props.users;
        console.log('header-auth', isAuthenticated)
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="logo" >
                            <span className="logo-in">IN</span>
                            <span className="logo-touch">touch</span>
                        </div>
                        <ul className="nav nav-pills header-nav">
                            <li role="presentation"  >
                                <Link to="/chat"  activeClassName='active' >Chat</Link>
                            </li>

                            { !isAuthenticated ?
                                <li role="presentation"  >
                                    <Link to="/auth" activeClassName='active' >Sign In</Link>
                                </li>
                                :
                                null
                            }
                            <li role="presentation"  >
                                {
                                    !isAuthenticated ? 
                                        <Link to={ '/login' } activeClassName='active' >Login</Link>
                                        :
                                        <button className="btn btn-primary btn-lg" onClick={() => this.handleUserLogout()} activeClassName='active' >Logout</button>
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
    users: state.users,
    socket: state.socket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLeftChat: (user) => dispatch(userLeftChat(user)),
    userLogout: () => dispatch(userLogout()),
    fetchNotActiveUsers: () => dispatch(fetchNotActiveUsers())    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);