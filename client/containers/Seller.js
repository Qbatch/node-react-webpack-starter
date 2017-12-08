import React from 'react';

import SellerComponent from '../components/Seller.jsx';

import { fetchProductsBySellerId, deleteProduct } from '../actions/productActions';

import Auth from '../modules/Auth';

export default class Seller extends React.Component {
  addProduct = () => {
    // console.log('addProduct()');

    if (Auth.isUserAuthenticated) {
        this.props.history.push(`/add_product/${this.props.match.params.id}`);
    } else {
        console.log('User is not Authenticated!');
    }
  }

  editProduct = (id) => {
    // console.log('editProduct() ', id);

    if (Auth.isUserAuthenticated) {
        this.props.history.push(`/edit_product/${this.props.match.params.id}/${id}`);
    } else {
        console.log('User is not Authenticated!');
    }
  }

  deleteProduct = (id) => {
    // console.log('deleteProduct() ', id);

    this.props.dispatch(deleteProduct(id))

    this.props.dispatch(fetchProductsBySellerId(this.props.match.params.id))
  }

  render() {
    return (
      <SellerComponent
        products={this.props.products}
        onAddProductClicked={this.addProduct}
        onEditProductClicked={this.editProduct}
        onDeleteProductClicked={this.deleteProduct}
      />
    );
  }
}
