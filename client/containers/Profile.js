import React from 'react';
import { connect } from 'react-redux';

import ProfileComponent from '../components/Profile.jsx';
import Buyer from './Buyer';
import Seller from './Seller';

import { clearUserAction, fetchUserAction } from '../actions/userActions';
import { clearProductsAction, fetchProductsLength, fetchProducts, fetchProductsBySellerIdLength, fetchProductsBySellerId } from '../actions/productActions';

import Auth from '../modules/Auth';

class Profile extends React.Component {
  
  state = {
    userFetched: false,
    userLogout: false,
    productsChunk: 5,
    productsSkip: 0
  };

  componentWillMount() {
    console.log('Profile componentWillMount() ', this.props);

    this.props.dispatch(fetchUserAction(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps() ', nextProps);

    const {user, productsLength, products} = nextProps;

    if (user && user.role) {
      if (!this.state.userFetched) {
        this.setState({userFetched: true})
        
        if (user.role == 'Seller') {
          // console.log('Seller');
          this.props.dispatch(fetchProductsBySellerIdLength(nextProps.match.params.id));
        } else if (user.role == 'Buyer') {
          // console.log('Buyer');
          this.props.dispatch(fetchProductsLength());
        }
      } else {
        if (productsLength > 0) {
          if(products === this.props.products) {
            this.showProductsByRole();
          }
        }
      }
    }
  }

  logoutClicked = () => {
    this.props.history.push('/logout');
  }

  showProductsByRole = () => {
    if (this.props.user.role == 'Seller') {
      this.props.dispatch(fetchProductsBySellerId(this.props.match.params.id, this.state.productsSkip, this.state.productsChunk));
    } else if (this.props.user.role == 'Buyer') {
      this.props.dispatch(fetchProducts(this.state.productsSkip, this.state.productsChunk));
    }
  }

  leftClicked = () => {
    if (this.state.productsSkip != 0) {
      this.setState({
        productsSkip: this.state.productsSkip - this.state.productsChunk
      }, () => {
        this.showProductsByRole();
      });
    }
  }

  rightClicked = () => {
   if (this.state.productsSkip + this.state.productsChunk < this.props.productsLength) {
      this.setState({
        productsSkip: this.state.productsSkip + this.state.productsChunk
      }, () => {
        this.showProductsByRole();
      });
    }
  }

  render() {
    const {user} = this.props;

    return (
      <div>
        <ProfileComponent user={this.props.user}
          onLogoutClicked={this.logoutClicked}
        />
        {user.role === 'Buyer' && <Buyer {...this.props} 
          onLeftClicked={this.leftClicked}
          onRightClicked={this.rightClicked}
        />}
        {user.role === 'Seller' && <Seller {...this.props}
          onLeftClicked={this.leftClicked}
          onRightClicked={this.rightClicked}
          onShowProducts={this.showProductsByRole}
        />}
      </div>
    );
  }
}
     
export default connect(
  state => ({
    user: state.user,
    productsLength: state.products.productsLength,
    products: state.products.products,
    cart: state.cart.cart
  })
)(Profile)
