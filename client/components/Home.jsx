import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <h1>Welcome</h1>
        </div>
        <div>
          <RaisedButton label="SignIn" onClick={this.props.onSignInClicked} />
        </div>
        <div>
          <RaisedButton label="SignUp" onClick={this.props.onSignUpClicked} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onSignInClicked: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired
};
