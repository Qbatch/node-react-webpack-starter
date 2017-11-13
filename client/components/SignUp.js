import React from 'react';
import { connect } from 'react-redux';

import { signUp } from '../actions/userActions';

@connect((store) => {
  return {
    users: store.user.users,
  };
})
export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'ABC',
      age: '21',
      username: 'ABC-XYZ',
      email: 'abc.xyz@gmail.com',
      password: '12345678'
    };
  }

  nameValueChanged(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  ageValueChanged(e) {
    const age = e.target.value;
    this.setState({ age });
  }

  usernameValueChanged(e) {
    const username = e.target.value;
    this.setState({ username });
  }

  emailValueChanged(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  passwordValueChanged(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  signUpClicked() {
    this.props.dispatch(signUp(this.state.name, this.state.age, this.state.username, this.state.email, this.state.password))
    
    setTimeout(()=>{
      console.log ('Props = ', this.props);
      const {users} = this.props;
      console.log ('Users = ', users);
      const success = users.success;

      console.log('Success = ', success);

      if (success) this.props.history.push('/login');
    }, 2000)
  }

  render() {
    return (
    <div>
      <h1>
        Sign Up
      </h1>
      <div>
        <input value={this.state.name} onChange={this.nameValueChanged.bind(this)}/>
      </div>
      <div>
        <input value={this.state.age} onChange={this.ageValueChanged.bind(this)}/>
      </div>
      <div>
        <input value={this.state.username} onChange={this.usernameValueChanged.bind(this)}/>
      </div>
      <div>
        <input value={this.state.email} onChange={this.emailValueChanged.bind(this)}/>
      </div>
      <div>
        <input value={this.state.password} onChange={this.passwordValueChanged.bind(this)}/>
      </div>
      <div>
        <button onClick={this.signUpClicked.bind(this)}>SignUp</button>
      </div>
    </div>
    );
  }
}