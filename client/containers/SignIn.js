import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import SignInComponent from '../components/SignIn.jsx';

import { clearUserAction, signInAction } from '../actions/userActions';

import Auth from '../modules/Auth';

class SignIn extends React.Component {
  
  state = {
    email: 'Email',
    password: "Password",
    validation: {
      emailError: '',
      passwordError: '',
      success: true, 
      error:''
    }
  };

  componentWillMount() {
    // this.props.dispatch (clearUserAction());
    
    console.log('SignIn componentWillMount() ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    // invoked every time component is recieves new props.
    // does not before initial 'render'

    console.log('nextProps = ', nextProps);
    const {user} = nextProps;

    if(user) {
      if(user.token) {
        Auth.authenticateUser(user.token);

        if (Auth.isUserAuthenticated) {
          if (user.id) {
            // console.log('User with id#', user.id, ' is Authenticated!');
            this.props.history.push(`/profile/${user.id}`);
          }
        } else {
          // console.log('User is not Authenticated!');
        }
      } else if (user.error){
        // console.log('Error Ocurred');

        const val = this.state.validation;
        val.error = 'Email or Password is Incorrect';

        this.setState({ 
          validation: val
        }, () => this.props.dispatch (clearUserAction()));
      }
    }
  }

  emailValueChanged = (e) => {
    const email = e.target.value;
    this.setState({email: email});

    if (email.length === 0) {
      this.state.validation.emailError = 'Please provide your email address.';

      this.state.validation.success = false;
    } else if (!validator.isEmail(email)) {
      this.state.validation.emailError = 'Please provide correct email address.';
    
      this.state.validation.success = false;
    } else {
      this.state.validation.emailError = '';

      this.state.validation.success = true;
    }
  }

  passwordValueChanged = (e) => {
    const password = e.target.value;
    this.setState({password: password});

    if (password.length === 0) {
      this.state.validation.passwordError = 'Please provide your password.';

      this.state.validation.success = false;
    } else if (password.length < 8) {
      this.state.validation.passwordError = 'Password should be greater than 7.';

      this.state.validation.success = false;
    } else {
      this.state.validation.passwordError = '';

      this.state.validation.success = true;
    }
  }

  loginClicked = () => {
    if (this.state.validation.success) {
      this.props.dispatch(signInAction(this.state.email, this.state.password))
    }
  }

  render() {
    return (
      <SignInComponent {...this.state} 
        onEmailValueChanged={this.emailValueChanged}
        onPasswordValueChanged={this.passwordValueChanged}
        onLoginClicked={this.loginClicked} 
      />
    );
  }
}

export default connect(
  state => ({ 
    user: state.user
  })
)(SignIn)
