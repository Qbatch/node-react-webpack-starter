import React from 'react';
import { connect } from 'react-redux';
// import Pagination from 'material-ui-pagination';
import Pagination from "./Pagination";

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
    totalPages: -1,
    displayPages: 7,
    currentPageNo: 1,
    productsChunk: 5,
    productsSkip: 0,
    activePage: 15
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
            this.setState({
              totalPages: parseInt((productsLength / this.state.productsChunk) + 1, 10)},
              () => { console.log(this.state); this.showProductsByRole(); }
            );
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

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  setTotal(event, totalPages) {
    // eslint-disable-next-line no-param-reassign
    totalPages = totalPages.trim();
    if (totalPages.match(/^\d*$/)) {
      if (totalPages !== '') {
        // eslint-disable-next-line no-param-reassign
        totalPages = parseInt(totalPages, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        totalPages = 0;
      }
 
      this.setState({ totalPages });
    }
  }
 
  setDisplay(event, displayPages) {
    // eslint-disable-next-line no-param-reassign
    displayPages = displayPages.trim();
    if (displayPages.match(/^\d*$/)) {
      if (displayPages !== '') {
        // eslint-disable-next-line no-param-reassign
        displayPages = parseInt(displayPages, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        displayPages = 0;
      }
 
      this.setState({ displayPages });
    }
  }

  displayPage = (pageNo) => {
    console.log('pageNo = ', pageNo);

    this.setState({
      productsSkip: (pageNo - 1) * this.state.productsChunk
    }, () => {
      this.showProductsByRole();
    });
  }

  render() {
    const {user, products} = this.props;

    return (
      <div>
        <ProfileComponent user={this.props.user}
          onLogoutClicked={this.logoutClicked}
        />
        {products && products.length > 0 &&
          <div>
            <div>
              <h2>Products</h2>
            </div>
            <div
            style = { {
              width: 500,
              margin: '0 auto',
            } }
            >
              <Pagination
                total = { this.state.totalPages }
                current = { this.state.currentPageNo }
                display = { this.state.displayPages }
                onChange = { currentPageNo => this.setState({ currentPageNo }, () => { this.displayPage(currentPageNo) } )}
              />
            </div>
          </div>
        }
        {user.role === 'Buyer' && <Buyer {...this.props}
        />}
        {user.role === 'Seller' && <Seller {...this.props}
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
