import React from 'react';
import PropTypes from 'prop-types';

export default class DisplayCart extends React.PureComponent {
  totalPrice = () => {
    const {cart} = this.props;
    let totalPrice = 0;
    
    for(let i = 0; i < cart.length; ++i)
    totalPrice += parseInt(cart[i].quantity, 10) * parseInt(cart[i].price, 10)
    
    return totalPrice;
  }

  totalPriceOfItem = (id, quantity, price) => {
    let totalPrice = parseInt(quantity, 10) * parseInt(price, 10)
    
    return totalPrice;
  }
    
  displayCartItem = () => {
    const {
        cart,
        onIncrementQuantity,
        onDecrementQuantity,
        onRemoveFromCart
    } = this.props;

    return (
      cart.map((item, index) => (
      <span key={index}>
        <h4> Name: {item.name}, Color: {item.color}, Size: {item.size},
        Description: {item.description}, Price: {item.price}, Quantity: {item.quantity}
        <button onClick={() => onIncrementQuantity(item.id, item.quantity)}> + </button>
        <button onClick={() => onDecrementQuantity(item.id, item.quantity)}> - </button>
        <button onClick={() => onRemoveFromCart(item.id)}>Remove From Cart</button>
        Total Price: {this.totalPriceOfItem(item.id, item.quantity, item.price)}
        </h4>
      </span>
      ))
    );
  }

  render() {
    const {
      cart,
      onCheckOutClicked,
      onBackClicked
    } = this.props;

    return (
      <div>
        <div>
          <h1>Display Cart</h1>
          {cart && cart !== null &&
            <h2>Total Items in Cart {cart.length}</h2>
          }
        </div>
        <div>
          {cart && this.displayCartItem()}
        </div>
        <div>
            Total Price: {this.totalPrice()}
        </div>
        <div>
          <button onClick={onCheckOutClicked}>Checkout</button>
        </div>
        <div>
          <button onClick={onBackClicked}>Back</button>
        </div>
      </div>
    );
  }
}

DisplayCart.propTypes = {
  cart: PropTypes.array,
  onCheckOutClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired,
  onIncrementQuantity: PropTypes.func.isRequired,
  onDecrementQuantity: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};
