import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import '../styles/main.css';


export default class App extends Component {
	constructor(){
		super()		
	}	
	render(){  	
		return (
			<div>
				<Header/>
				<div className="content-wrap">				
					{this.props.children}
				</div>
			</div>
			
		)
	}
}
