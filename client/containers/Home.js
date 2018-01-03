import React from 'react';

import HomeComponent from '../components/Home.jsx';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

export default class Home extends React.Component {
  signInClicked = () => {
    this.props.history.push('sigin');
  }

  signUpClicked = () => {
    this.props.history.push('signup');
  }

  render () {
    return (
      <div>
        <HomeComponent onSignInClicked={this.signInClicked}
          onSignUpClicked={this.signUpClicked}
        />
        <LinkList />
        <CreateLink />
      </div>
    );
  }
};
