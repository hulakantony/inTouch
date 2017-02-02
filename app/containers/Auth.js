import React, {Component} from 'react';
import {signUpUser} from '../actions/signUpActions';
import {connect} from 'react-redux';

// import { connect } from 'react-redux';

const validation = {
    email: {
        isValid: (value) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(value),
        message: 'email is invalid'
    },
    password: {
        isValid: (value) => value.length > 5,
        message: 'password may be longer than 5 symbols'
    },
    nickname: {
        isValid: (value) => value.length > 3,
        message: 'nickname may be longer than 3 symbols'
    },
    require: {
        isValid: (value) => !!value,
        message: 'Please fill all required fields'
    }
};

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            nickname: '',
            photo: '',
            errors: null
        }
    }
    componentDidMount(){
    	console.log(333, this.props)
    }
    handleInputChange(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, pass, nickname} = this.state;
        const {signUpUser} = this.props;
        let errors = this.validateFields();
        if (!errors) {
            signUpUser({
                email: email,
                password: pass,
                nickname: nickname
            });
        } else {
            this.setState({errors})
        }
    }

    validateFields() {
        const {email, pass, nickname} = this.state;
        let errors = [];
        if (!validation.require.isValid(pass) || !validation.require.isValid(email) || !validation.require.isValid(nickname)) {
            errors.push(validation.require.message)
        }
        if (!validation.email.isValid(email)) {
            errors.push(validation.email.message)
        }
        if (!validation.nickname.isValid(nickname)) {
            errors.push(validation.nickname.message)
        }
        if (!validation.password.isValid(pass)) {
            errors.push(validation.password.message)
        }
        if (errors.length === 0) {
            errors = null
        }
        return errors
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="login-signin-wrap">
                <form className="col-md-6" onSubmit={ e => this.handleSubmit(e) }>
                    <div className="form-group">
                        <label>Email address*</label>
                        <input
                            className="form-control"
                            onChange={ (e) => this.handleInputChange(e, 'email') }
                            placeholder="E-mail"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label>Nickname*</label>
                        <input
                            className="form-control"
                            onChange={ (e) => this.handleInputChange(e, 'nickname') }
                            placeholder="Nickname"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password*</label>
                        <input
                            className="form-control"
                            onChange={ (e) => this.handleInputChange(e, 'pass') }
                            placeholder="Password"
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Photo</label>
                        <input
                            className="form-control"
                            onChange={ (e) => this.handleInputChange(e, 'photo') }
                            placeholder="Photo URL"
                            type="text"
                        />
                    </div>
                    {errors &&
                    errors.map((error, index) => (
                        <div className="alert alert-danger" key={index}>{error}</div>
                    ))
                    }
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )

    }
}


 const mapStateToProps = (state) => {
   return {

   }
 }

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: (user) => dispatch(signUpUser(user))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
