import React from 'react';
import { connect } from 'react-redux';

import { createCharge} from '../actions/cartActions';

import Auth from '../modules/Auth';

@connect((store) => {
    return {
      users: store.users.users,
      products: store.products.products,
      cart: store.cart.cart
    };
  })
export default class Payment extends React.Component {
    constructor() {
        super();

        const self = this;
        
        this.handler = StripeCheckout.configure({
            key: 'pk_test_N70AAGbzbSQoUJAaPdytmaND',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              console.log('token: ', token);
              self.props.dispatch(createCharge(token.id, '2000'));
            }
          });
    }

    payClicked = () => {
        console.log('payClicked()');

        this.handler.open({
            name: 'Stripe.com',
            description: '2 widgets',
            zipCode: true,
            amount: 2000
          });
    }

    backClicked = () => {
        if (Auth.isUserAuthenticated) {
          this.props.history.push(`/profile/${this.props.match.params.id}`);
        } else {
          console.log('User is not Authenticated!');
        }
    }

    render() {
        return (
                <div>
                    <div>
                        <button onClick={() => this.payClicked()}>Pay</button>
                    </div>
                    <div>
                        <button onClick={() => this.backClicked()}>Back</button>
                    </div>
                </div>
        );
    }
}
