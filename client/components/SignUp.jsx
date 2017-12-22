import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

export default class SignUp extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRole = (role) => {
    this.props.onRoleChanged(role);

    this.handleClose();
  }

  render() {
    return (
      <div>
        <h1>
          Sign Up
        </h1>
        <div>
          <TextField
            id="name"
            defaultValue={this.props.name}
            helperText="Alpha-Numeric"
            margin="normal"
            onChange={this.props.onNameValueChanged}
          />
        </div>
        <div>
          <TextField
            id="age"
            defaultValue={this.props.age}
            helperText="Numeric"
            margin="normal"
            onChange={this.props.onAgeValueChanged}
          />
        </div>
        <div>
          <TextField
            id="username"
            defaultValue={this.props.username}
            helperText="Alpha-Numeric"
            margin="normal"
            onChange={this.props.onUsernameValueChanged}
          />
        </div>
        <div>
          <TextField
            id="email"
            defaultValue={this.props.email}
            helperText="abc@xyz.com"
            margin="normal"
            onChange={this.props.onEmailValueChanged}
          />
        </div>
        <div>
          <TextField
            id="password"
            defaultValue={this.props.password}
            helperText="Alpha-Numeric"
            margin="normal"
            onChange={this.props.onPasswordValueChanged}
          />
        </div>
        <div>
          <br/>
          Role:
          <Button
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {this.props.role}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => this.handleRole('Seller')}>Seller</MenuItem>
            <MenuItem onClick={() => this.handleRole('Buyer')}>Buyer</MenuItem>
          </Menu>
        </div>
        <div>
          <h3>{this.props.validation.error}</h3>
        </div>
        <div>
          <Button raised onClick={this.props.onSignUpClicked} >SignUp</Button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  validation: PropTypes.object.isRequired,
  onNameValueChanged: PropTypes.func.isRequired,
  onAgeValueChanged: PropTypes.func.isRequired,
  onUsernameValueChanged: PropTypes.func.isRequired,
  onEmailValueChanged: PropTypes.func.isRequired,
  onPasswordValueChanged: PropTypes.func.isRequired,
  onRoleChanged: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired
};
