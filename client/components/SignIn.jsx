import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default function SignIn(props) {
  return (
    <div>
      <h1>
        Sign In
      </h1>
      <div>
        <TextField
          id="email"
          defaultValue={props.email}
          helperText="abc@xyz.com"
          margin="normal"
          onChange={props.onEmailValueChanged}
        />
        <h3>{props.validation.emailError}</h3>
        <br />
        <TextField
          id="password"
          defaultValue={props.password}
          helperText="Alpha-Numeric"
          margin="normal"
          onChange={props.onPasswordValueChanged}
        />
        <h3>{props.validation.passwordError}</h3>
        <br />
        <h3>{props.validation.error}</h3>
        <br />
        <Button raised onClick={props.onLoginClicked} >Login</Button>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  validation: PropTypes.object.isRequired,
  onEmailValueChanged: PropTypes.func.isRequired,
  onPasswordValueChanged: PropTypes.func.isRequired,
  onLoginClicked: PropTypes.func.isRequired
};
