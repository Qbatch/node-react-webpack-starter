import React from 'react';
import PropTypes from 'prop-types';

export default function SignIn(props) {
  return (
    <div>
      <h1>
        Sign In
      </h1>
      <div>
        <input value={props.email} onChange={props.onEmailValueChanged} />
        <h3>{props.validation.emailError}</h3>
      </div>
      <div>
        <input value={props.password} onChange={props.onPasswordValueChanged} />
        <h3>{props.validation.passwordError}</h3>
      </div>
      <div>
        <button onClick={props.onLoginClicked}>Login</button>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  validation: PropTypes.object,
  onEmailValueChanged: PropTypes.func.isRequired,
  onPasswordValueChanged: PropTypes.func.isRequired,
  onLoginClicked: PropTypes.func.isRequired
};
