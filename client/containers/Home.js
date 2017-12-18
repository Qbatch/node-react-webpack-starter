import React from 'react';
import { Link } from 'react-router-dom';

import HomeComponent from '../components/Home.jsx';

export default class Home extends React.Component {
  signInClicked = () => {
    this.props.history.push('sigin');
  }

  signUpClicked = () => {
    this.props.history.push('signup');
  }

  render () {
    return (
      <HomeComponent onSignInClicked={this.signInClicked}
        onSignUpClicked={this.signUpClicked}
      />
    );
  }
};
