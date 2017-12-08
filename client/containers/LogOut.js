import React from 'react';

import LogOutComponent from '../components/LogOut.jsx';

import Auth from '../modules/Auth';

export default class LogOut extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser();

    console.log('\n\nisAuthenticated = ', Auth.isUserAuthenticated(), '\n\n');
  }
  
  homeClicked = () => {
    this.props.history.push('/');
  }

  render() {
    return (
        <LogOutComponent onHomeClicked={this.homeClicked} />
    );
  }
}
