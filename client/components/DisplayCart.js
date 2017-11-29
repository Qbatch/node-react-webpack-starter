import React from 'react';
import { connect } from 'react-redux';

import { fetchProduct, incrementQuantity, decrementQuantity, removeFromCart, checkOut } from '../actions/cartActions';

import Auth from '../modules/Auth';

@connect((store) => {
    return {
      users: store.users.users,
      products: store.products.products,
      cart: store.cart.cart
    };
  })
export default class DisplayCart extends React.Component {
    constructor() {
        super();
    
        this.state = {
          checkOut: false
        };
      }

    componentWillReceiveProps(nextProps) {
        // invoked every time component is recieves new props.
        // does not before initial 'render'
    
        console.log('nextProps = ', nextProps.cart);

        if(nextProps.cart.length === 0) {
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

    totalPriceOfItem = (id, quantity, price) => {
        let totalPrice = parseInt(quantity, 10) * parseInt(price, 10)
        
        return totalPrice;
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
        
        if (this.totalPrice() > 0)
            this.props.dispatch(checkOut(checkOutData, this.props.match.params.id, this.totalPrice()));
    }

    render() {
        // console.log('render() ', this.props);

        const {cart} = this.props;
        
        return (
                <div>
                    <div>
                        <h1>Display Cart</h1>
                        {cart && cart !== null &&
                            <h2>Total Items in Cart {cart.length}</h2>
                        }
                    </div>
                    <div>
                    {cart && cart.map((item, index) => (
                    <span key={index}>
                        <h4> Name: {item.name}, Color: {item.color}, Size: {item.size}, Description: {item.description}, 
                        Price: {item.price}, Quantity: {item.quantity}
                        <button onClick={() => this.incrementQuantity(item.id, item.quantity)}> + </button>
                        <button onClick={() => this.decrementQuantity(item.id, item.quantity)}> - </button>
                        <button onClick={() => this.removeFromCart(item.id)}>Remove From Cart</button>
                        Total Price: {this.totalPriceOfItem(item.id, item.quantity, item.price)}
                    </h4>
                    </span>
                    ))}
                    </div>
                    <div>
                        Total Price: {this.totalPrice()}
                    </div>
                    <div>
                        <button onClick={() => this.checkOut()}>Checkout</button>
                    </div>
                    <div>
                        <button onClick={() => this.backClicked()}>Back</button>
                    </div>
                </div>
        );
    }
}
