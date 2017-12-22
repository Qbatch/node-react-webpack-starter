import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';

import SignUpComponent from '../components/SignUp.jsx';

import { signUpAction } from '../actions/userActions';

class SignUp extends React.Component {

  state = {
    name: 'Name',
    age: 'Age',
    username: 'User Name',
    email: 'Email',
    password: 'Password',
    role: 'Seller / Buyer',
    validation: {
      error: ''
    }
  };

  nameValueChanged = (e) => {
    const name = e.target.value;
    this.setState({ name });
  }

  ageValueChanged = (e) => {
    const age = e.target.value;
    this.setState({ age });
  }

  usernameValueChanged = (e) => {
    const username = e.target.value;
    this.setState({ username });
  }

  emailValueChanged = (e) => {
    const email = e.target.value;
    this.setState({ email });
  }

  passwordValueChanged = (e) => {
    const password = e.target.value;
    this.setState({ password });
  }

  roleChanged = (e) => {
    const role = e;
    this.setState ({role: role});
  }

  signUpClicked = () => {
    this.props.dispatch(signUpAction(this.state.name, this.state.age, this.state.username, this.state.email, this.state.password, this.state.role))
  }

  componentWillMount() {
    console.log('SignUp componentWillMount() ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    const {user} = nextProps;
    
    if(user) {
      if(user.fetched && user.success) {
        this.props.history.push('/sigin');
      } else if(!user.fetched && user.error != null) {
        const val = this.state.validation;
        val.error = user.error.response.data.message;

        this.setState({ 
          validation: val
        });
      }
    }
  }

  render() {
    return (
      <SignUpComponent {...this.state}
        onNameValueChanged={this.nameValueChanged}
        onAgeValueChanged={this.ageValueChanged}
        onUsernameValueChanged={this.usernameValueChanged}
        onEmailValueChanged={this.emailValueChanged}
        onPasswordValueChanged={this.passwordValueChanged}
        onRoleChanged={this.roleChanged}
        onSignUpClicked={this.signUpClicked} />
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(SignUp)

