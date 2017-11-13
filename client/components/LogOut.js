import React from 'react';

import Auth from '../modules/Auth';

export default class LogOut extends React.Component {
    homeClicked() {
      this.props.history.push('/');
    }

    componentWillMount() {
      Auth.deauthenticateUser();

      console.log('\n\nisAuthenticated = ', Auth.isUserAuthenticated(), '\n\n');
    }

    render() {
        return (<div>
            <h1>You Have Successfully Logout</h1>
            <div>
            <button onClick={this.homeClicked.bind(this)}>Home</button>
            </div>
          </div>
        );
    }
}
