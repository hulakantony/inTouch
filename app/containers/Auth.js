import React, {Component} from 'react';
import {signUpUser} from '../actions/signUpActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'


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
            previewSrc: '',
            file: null,
            errors: null
        }
    }

    componentDidMount() {
        console.log(333, this.props)
    }

    handleInputChange(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        //if the file isn't a image nothing happens.
        //you are free to implement a fallback
        if (!file || !file.type.match(/image.*/)) {
            return;
        }

        reader.onloadend = () => {
            this.setState({
                file,
                previewSrc: reader.result
            });
        };

        reader.readAsDataURL(file);
    }


    handleSubmit(e) {
        e.preventDefault();
        const {email, pass, nickname, file} = this.state;
        const {signUpUser} = this.props;
        const formData = new FormData();
        let errors = this.validateFields();

        if (errors) {
            this.setState({errors});
        } else {
            formData.append('email', email);
            formData.append('password', pass);
            formData.append('nickname', nickname);
            formData.append('photo', file);
            signUpUser(formData);
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
        const {errors, previewSrc} = this.state;
        const {message} = this.props.signup;

        return (
            <div className="login-signin-wrap">
                <form className="col-md-6" onSubmit={ (e) => this.handleSubmit(e) }>
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
                        <div className="upload-photo">
                            <div className="upload-area-holder">
                                <img className="avatar" src={previewSrc||''} alt=""/>
                                <input
                                    className="form-control"
                                    onChange={(e)=>this.handleImageChange(e)}
                                    placeholder="Photo URL"
                                    type="file"
                                />
                            </div>
                        </div>
                    </div>
                    {errors &&
                    errors.map((error, index) => (
                        <div className="alert alert-danger" key={index}>{error}</div>
                    ))
                    }
                    {
                        message && <div className="alert alert-danger">{ message }</div>
                    }
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )

    }
}


const mapStateToProps = ({signup}) => ({
    signup
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({signUpUser},dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
