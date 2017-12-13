import React from 'react';

import SellerComponent from '../components/Seller.jsx';

import { fetchProductsBySellerIdLength, fetchProductsBySellerId, deleteProduct } from '../actions/productActions';

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

  editProduct = (obj) => {
    // console.log('editProduct() ', obj);

    if (Auth.isUserAuthenticated) {
      this.props.history.push(`/edit_product/${this.props.match.params.id}/${obj.id}`, {
        name: obj.name,
        color: obj.color,
        size: obj.size,
        description: obj.description,
        price: obj.price
      });
    } else {
        console.log('User is not Authenticated!');
    }
  }

  deleteProduct = (id) => {
    // console.log('deleteProduct() ', id);

    this.props.dispatch(deleteProduct(id))

    this.props.dispatch(fetchProductsBySellerIdLength(this.props.match.params.id));

    this.props.onShowProducts();
  }

  render() {
    return (
      <SellerComponent
        products={this.props.products}
        onLeftClicked={this.props.onLeftClicked}
        onRightClicked={this.props.onRightClicked}
        onAddProductClicked={this.addProduct}
        onEditProductClicked={this.editProduct}
        onDeleteProductClicked={this.deleteProduct}
      />
    );
  }
}
