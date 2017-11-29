import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';

import { signUp } from '../actions/userActions';

const options = [
  'Select an option', 'Seller', 'Buyer'
]
const defaultOption = options[1];

@connect((store) => {
  return {
    users: store.users.users,
  };
})
export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'ABCD',
      age: '21',
      username: 'ABC-XYZ',
      email: 'abc.xyz@gmail.com',
      password: '12345678',
      role: 'Seller'
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

  OnSelect = (e) => {
    const role = e.value;
    this.setState ({role: role});
  }

  signUpClicked() {
    this.props.dispatch(signUp(this.state.name, this.state.age, this.state.username, this.state.email, this.state.password, this.state.role))
  }

  componentWillReceiveProps(nextProps) {
    const {users} = nextProps;
    
    if(users) {
      if(users.success) {
        this.props.history.push('/login');
      }
    }
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
        Role: <Dropdown options={options} onChange={this.OnSelect} value={defaultOption} placeholder="Select an option" />
      </div>
      <div>
        <button onClick={this.signUpClicked.bind(this)}>SignUp</button>
      </div>
    </div>
    );
  }
}