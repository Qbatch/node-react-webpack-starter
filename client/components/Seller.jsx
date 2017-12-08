import React from 'react';
import PropTypes from 'prop-types';

export default class Seller extends React.PureComponent {
  isSeller = (id) => {
    const { onEditProductClicked, onDeleteProductClicked } = this.props;

    return (
      <div>
        <button onClick={() => onEditProductClicked(id)}>Edit</button>
        <button onClick={() => onDeleteProductClicked(id)}>Delete</button>
      </div>
    );
  }

  render() {
    const {
      products,
      onAddProductClicked
    } = this.props;

    return (
      <div>
        <div>
          <h2>Products</h2>
          {products && products.map((item, index) => (
            <span key={index}>
              <h4> Name: {item.name}, Color: {item.color}, Size: {item.size}, Description: {item.description}, Price: {item.price}
                {this.isSeller(item.id)}
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
  onAddProductClicked: PropTypes.func.isRequired,
  onEditProductClicked: PropTypes.func.isRequired,
  onDeleteProductClicked: PropTypes.func.isRequired,
};
