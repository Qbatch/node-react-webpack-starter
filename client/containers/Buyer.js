import React from 'react';

import BuyerComponent from '../components/Buyer.jsx';

import { addToCart, removeFromCart } from '../actions/cartActions';

export default class Buyer extends React.Component {
  addToCart = (id) => {
    this.props.dispatch(addToCart(id));
  }

  removeFromCart = (id) => {
    this.props.dispatch(removeFromCart(id));
  }
  
  displayCart = () => {
    this.props.history.push(`/displayCart/${this.props.match.params.id}`);
  }

  render() {
    return (
      <BuyerComponent
        products={this.props.products}
        cart={this.props.cart}
        onLeftClicked={this.props.onLeftClicked}
        onRightClicked={this.props.onRightClicked}
        onAddToCartClicked={this.addToCart}
        onRemoveFromCartClicked={this.removeFromCart}
        onDisplayCart={this.displayCart}
      />
    );
  }
}
