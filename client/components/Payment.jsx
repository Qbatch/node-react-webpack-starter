import React from 'react';
import PropTypes from 'prop-types';

export default class Payment extends React.PureComponent {
  render() {
    const {
      onPayClicked,
      onBackClicked
    } = this.props;

    return (
      <div>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <button onClick={onPayClicked}>Pay</button>
        </div>
        <div>
          <button onClick={onBackClicked}>Back</button>
        </div>
      </div>
    );
  }
}

Payment.propTypes = {
  onPayClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired
};
