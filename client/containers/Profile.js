import React from 'react';
import { connect } from 'react-redux';

import ProfileComponent from '../components/Profile.jsx';
import Buyer from './Buyer';
import Seller from './Seller';

import { clearUserAction, fetchUserAction } from '../actions/userActions';
import { clearProductsAction, fetchProducts, fetchProductsBySellerId, deleteProduct } from '../actions/productActions';

import Auth from '../modules/Auth';

class Profile extends React.Component {
  
  state = {
    userFetched: false,
    userLogout: false
  };

  componentWillMount() {
    // console.log('componentWillMount() ', this.props);

    this.props.dispatch(fetchUserAction(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps() ', nextProps);

    const {user} = nextProps;
    const {products} = nextProps;

    if (user && !this.state.userFetched && user.role) {
      this.setState({userFetched: true})
        
      if (user.role == 'Seller') {
        // console.log('Seller');
        this.props.dispatch(fetchProductsBySellerId(nextProps.match.params.id))
      } else if (user.role == 'Buyer') {
        // console.log('Buyer');
        this.props.dispatch(fetchProducts())
      }
    }

    if (this.state.userLogout && !user.id && products.length == 0) {
      this.props.history.push('/logout');
    }
  }

  logoutClicked = () => {
    // Make Sure When state is changed than dispatch
    this.setState({
      userLogout: true
    }, () => {
      this.props.dispatch(clearUserAction());
      this.props.dispatch(clearProductsAction());
    });
  }

  render() {
    const {user} = this.props;

    return (
      <div>
        <ProfileComponent user={this.props.user}
          onLogoutClicked={this.logoutClicked}
        />
        {user.role === 'Buyer' && <Buyer {...this.props}/>}
        {user.role === 'Seller' && <Seller {...this.props}/>}
      </div>
    );
  }
}
     
export default connect(
  state => ({
    user: state.user,
    products: state.products.products,
    cart: state.cart.cart
  })
)(Profile)
