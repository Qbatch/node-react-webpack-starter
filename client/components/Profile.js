import React from 'react';
import { connect } from 'react-redux';

import {fetchUser} from '../actions/userActions';
import Auth from '../modules/Auth';

@connect((store) => {
  return {
    users: store.user.users,
  };
})
export default class Profile extends React.Component {
  componentWillMount() {
    console.log (this.props.match.params.id);
    this.props.dispatch(fetchUser(this.props.match.params.id))

    setTimeout(()=>{
      console.log (this.props);

      console.log('\n\nisAuthenticated = ', Auth.isUserAuthenticated(), '\n\n');
    }, 2000)
  }

  logoutClicked() {
    this.props.history.push('/logout');
  }

  render() {
    const {users} = this.props;

    return <div>
        <div>
        <h1>Profile</h1>
        <h2>Name: {users.name}</h2>
        <h2>Age: {users.age}</h2>
        <h2>UserName: {users.username}</h2>
        <h2>Password: {users.password}</h2>
        <h2>Email: {users.email}</h2>
        </div>
        <div>
          <button onClick={this.logoutClicked.bind(this)}>Logout</button>
        </div>
      </div>;
  }
}