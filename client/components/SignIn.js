import React from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import {signIn} from '../actions/userActions';
import Auth from '../modules/Auth';

@connect((store) => {
  return {
    users: store.user.users,
  };
})
export default class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "bilal.shah@gmail.com",
      password: "QBatch123",
      validation: {
        emailError: '',
        passwordError: '',
        success: true
      }
    };
  }

  emailValueChanged(e) {
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

  passwordValueChanged(e) {
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

  loginClicked() {
    if (this.state.validation.success) {
      this.props.dispatch(signIn(this.state.email, this.state.password))
      
      setTimeout(()=>{
        const {users} = this.props;

        Auth.authenticateUser(users.token);

        if (Auth.isUserAuthenticated) {
          this.props.history.push(`/profile/${users.user.id}`);
        } else {
          console.log('User is not Authenticated!');
        }
      }, 2000)
    }
  }

  render() {
    return (
    <div>
      <h1>
        Sign In
      </h1>
      <div>
        <input value={this.state.email} onChange={this.emailValueChanged.bind(this)}/>
        <h3>{this.state.validation.emailError}</h3>
      </div>
      <div>
        <input value={this.state.password} onChange={this.passwordValueChanged.bind(this)}/>
        <h3>{this.state.validation.passwordError}</h3>
      </div>
      <div>
        {<button onClick={this.loginClicked.bind(this)}>Login</button>}
      </div>
    </div>
    );
  }
}