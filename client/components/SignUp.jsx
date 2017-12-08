import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';

const options = [
  'Select an option', 'Seller', 'Buyer'
];
const defaultOption = options[1];

export default function SignUp(props) {
  return (
    <div>
      <h1>
        Sign Up
      </h1>
      <div>
        <input value={props.name} onChange={props.onNameValueChanged} />
      </div>
      <div>
        <input value={props.age} onChange={props.onAgeValueChanged} />
      </div>
      <div>
        <input value={props.username} onChange={props.onUsernameValueChanged} />
      </div>
      <div>
        <input value={props.email} onChange={props.onEmailValueChanged} />
      </div>
      <div>
        <input value={props.password} onChange={props.onPasswordValueChanged} />
      </div>
      <div>
        Role: <Dropdown
          options={options}
          onChange={props.onRoleChanged}
          value={defaultOption}
          placeholder="Select an option"
        />
      </div>
      <div>
        <h3>{props.validation.error}</h3>
      </div>
      <div>
        <button onClick={props.onSignUpClicked}>SignUp</button>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  name: PropTypes.string,
  age: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  validation: PropTypes.object,
  onNameValueChanged: PropTypes.func.isRequired,
  onAgeValueChanged: PropTypes.func.isRequired,
  onUsernameValueChanged: PropTypes.func.isRequired,
  onEmailValueChanged: PropTypes.func.isRequired,
  onPasswordValueChanged: PropTypes.func.isRequired,
  onRoleChanged: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired
};
