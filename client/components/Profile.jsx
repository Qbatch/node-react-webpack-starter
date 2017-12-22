import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

export default class Profile extends React.PureComponent {
  render() {
    const {
      user,
      onLogoutClicked
    } = this.props;

    return (
      <div>
        <div>
          <div>
            <h1>Profile</h1>
            <h2>Name: {user.name}</h2>
            <h2>Age: {user.age}</h2>
            <h2>UserName: {user.username}</h2>
            <h2>Role: {user.role}</h2>
          </div>
          <div>
            <Button raised onClick={() => onLogoutClicked()} >Logout</Button>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  onLogoutClicked: PropTypes.func.isRequired
};
