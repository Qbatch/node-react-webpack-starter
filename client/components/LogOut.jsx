import React from 'react';
import PropTypes from 'prop-types';

export default function LogOut(props) {
  return (
    <div>
      <h1>You Have Successfully Logout</h1>
      <div>
        <button onClick={props.onHomeClicked}>Home</button>
      </div>
    </div>
  );
}

LogOut.propTypes = {
  onHomeClicked: PropTypes.func.isRequired
};
