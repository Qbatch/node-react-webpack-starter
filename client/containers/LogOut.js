import React from 'react';
import { connect } from 'react-redux';

import LogOutComponent from '../components/LogOut.jsx';

import Auth from '../modules/Auth';

export default class LogOut extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser();

    console.log('Logout componentWillMount() ', this.props);
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
