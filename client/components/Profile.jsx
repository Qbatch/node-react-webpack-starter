import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

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
            <RaisedButton label="Logout" primary={true} onClick={() => onLogoutClicked()} />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  onLogoutClicked: PropTypes.func.isRequired
};
