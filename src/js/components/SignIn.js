import React from "react"

import {connect} from "react-redux"

import {loginUser} from "../actions/userActions"

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
    };
  }

  emailValueChanged(e) {
    const email = e.target.value;
    this.setState({email: email});
  }

  passwordValueChanged(e) {
    const password = e.target.value;
    this.setState({password: password});
  }

  loginClicked() {
    this.props.dispatch(loginUser(this.state.email, this.state.password))
    
    setTimeout(()=>{
      const {users} = this.props;
      
      console.log ("Users" , users.id);

      // Token

      this.props.history.push(`/profile/${users.id}`);
    }, 2000)
  }

  render() {
    return (
    <div>
      <h1>
        Sign In
      </h1>
      <div>
        <input value={this.state.email} onChange={this.emailValueChanged.bind(this)}/>
      </div>
      <div>
        <input value={this.state.password} onChange={this.passwordValueChanged.bind(this)}/>
      </div>
      <div>
        <button onClick={this.loginClicked.bind(this)}>Login</button>
      </div>
    </div>
    );
  }
}