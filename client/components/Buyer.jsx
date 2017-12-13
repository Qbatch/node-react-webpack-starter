import React from 'react';
import PropTypes from 'prop-types';

export default class Buyer extends React.PureComponent {
  isInCart = (id) => {
    const {cart} = this.props;

    var obj = cart.filter((item) => item.id === id )[0];

    if(obj)
      return true;

    return false;
  }

  isBuyer = (id) => {
    const { onAddToCartClicked, onRemoveFromCartClicked } = this.props;

    return (
      <div>
      {this.isInCart(id) ?
        <button onClick={() => onRemoveFromCartClicked(id)}>Remove From Cart</button> :
        <button onClick={() => onAddToCartClicked(id)}>Add To Cart</button>
      }
      </div>
    );
  }

  render() {
    const {
      products,
      cart,
      onLeftClicked,
      onRightClicked,
      onDisplayCart
    } = this.props;

    return (
      <div>
        <div>
          <h2>{cart.length} <button onClick={onDisplayCart}>Cart</button></h2>
        </div>
        <div>
          <h2>Products</h2>
          <button onClick={() => onLeftClicked()}>Left</button>
          <button onClick={() => onRightClicked()}>Right</button>
          {products && products.map((item, index) => (
            <span key={index}>
              <h4> Name: {item.name}, Color: {item.color}, Size: {item.size}, Description: {item.description}, Price: {item.price}
                {this.isBuyer(item.id)}
              </h4>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

Buyer.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.array,
  onLeftClicked: PropTypes.func.isRequired,
  onRightClicked: PropTypes.func.isRequired,
  onAddToCartClicked: PropTypes.func.isRequired,
  onRemoveFromCartClicked: PropTypes.func.isRequired,
  onDisplayCart: PropTypes.func.isRequired
};
