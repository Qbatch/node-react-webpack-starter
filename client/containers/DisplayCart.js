import React from 'react';
import { connect } from 'react-redux';

import DisplayCartComponent from '../components/DisplayCart.jsx';

import { fetchProduct, incrementQuantity, decrementQuantity, removeFromCart, checkOut } from '../actions/cartActions';

import Auth from '../modules/Auth';

class DisplayCart extends React.Component {
  state = {
    isCheckout: false
  };
      
      
  componentWillReceiveProps(nextProps) {
    // invoked every time component is recieves new props.
    // does not before initial 'render'

    console.log('nextProps = ', nextProps.cart);

    if(this.state.isCheckout && nextProps.cart.length === 0) {
      this.props.history.push(`/payment/${this.props.match.params.id}`);
    }
  }

  backClicked = () => {
    if (Auth.isUserAuthenticated) {
        this.props.history.push(`/profile/${this.props.match.params.id}`);
    } else {
        console.log('User is not Authenticated!');
    }
  }

  incrementQuantity = (id, quantity) => {
    // Increment
    let val = parseInt(quantity, 10)
    val++;

    // Save
    this.props.dispatch(incrementQuantity(id, val));
  }

  decrementQuantity = (id, quantity) => {
    // Decrement
    let val = parseInt(quantity, 10)
    val--;

    if(val < 1)
        return;

    // Save
    this.props.dispatch(decrementQuantity(id, val));
  }

  removeFromCart = (id) => {
    this.props.dispatch(removeFromCart(id));
  }

  totalPrice = () => {
    const {cart} = this.props;
    let totalPrice = 0;

    for(let i = 0; i < cart.length; ++i)
    totalPrice += parseInt(cart[i].quantity, 10) * parseInt(cart[i].price, 10)

    return totalPrice;
  }

  checkOut = (id) => { 
    const {cart} = this.props;
    
    const checkOutData = cart.map(item => (Object.assign({
      id: item.id,
      price: item.price,
      quantity: item.quantity
    })));
    
    if (this.totalPrice() > 0) {
      this.setState({
        isCheckout: true
      }, () => {
        this.props.dispatch(checkOut(checkOutData, this.props.match.params.id, this.totalPrice()));
      });
    }
  }

  render() {
    return (
      <DisplayCartComponent cart={this.props.cart}
        onCheckOutClicked={this.checkOut}
        onBackClicked={this.backClicked}
        onIncrementQuantity={this.incrementQuantity}
        onDecrementQuantity={this.decrementQuantity}
        onRemoveFromCart={this.removeFromCart}
      />
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    products: state.products.products,
    cart: state.cart.cart
  })
)(DisplayCart)
