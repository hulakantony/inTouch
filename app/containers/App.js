import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import '../styles/main.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080/');
export default class App extends Component {
	constructor(){
		super()		
	}	
	render(){  	
		return (
			<div>
				<Header/>
				<div className="content-wrap">				
					{this.props.children && React.cloneElement(this.props.children, {
              socket: socket})}
				</div>
			</div>
			
		)
	}
}
