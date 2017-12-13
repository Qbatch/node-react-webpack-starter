import React from 'react';
import PropTypes from 'prop-types';

export default class Seller extends React.PureComponent {
  render() {
    const {
      products,
      onLeftClicked,
      onRightClicked,
      onAddProductClicked,
      onEditProductClicked,
      onDeleteProductClicked
    } = this.props;

    return (
      <div>
        <div>
          <h2>Products</h2>
          <button onClick={() => onLeftClicked()}>Left</button>
          <button onClick={() => onRightClicked()}>Right</button>
          {products && products.map((item, index) => (
            <span key={index}>
              <h4> Name: {item.name}, Color: {item.color}, Size: {item.size}, Description: {item.description}, Price: {item.price}
                <button onClick={() => onEditProductClicked(item)}>Edit</button>
                <button onClick={() => onDeleteProductClicked(item.id)}>Delete</button>
              </h4>
            </span>
          ))}
        </div>
        <div>
          <button onClick={onAddProductClicked}>Add</button>
        </div>
      </div>
    );
  }
}

Seller.propTypes = {
  products: PropTypes.array,
  onLeftClicked: PropTypes.func.isRequired,
  onRightClicked: PropTypes.func.isRequired,
  onAddProductClicked: PropTypes.func.isRequired,
  onEditProductClicked: PropTypes.func.isRequired,
  onDeleteProductClicked: PropTypes.func.isRequired
};
