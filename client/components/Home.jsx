import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <h1>Welcome</h1>
        </div>
        <div>
          <Button raised onClick={this.props.onSignInClicked} > SignIn </Button>
          <Button raised onClick={this.props.onSignUpClicked} > SignUp </Button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onSignInClicked: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired
};
