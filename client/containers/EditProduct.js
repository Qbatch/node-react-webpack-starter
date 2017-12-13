import React from 'react';
import { connect } from 'react-redux';

import EditProductComponent from '../components/EditProduct.jsx';

import { editProduct } from '../actions/productActions';
import Auth from '../modules/Auth';

class EditProduct extends React.Component {
  state = {
    name: 'Name',
    color: "Color",
    size: 'Size',
    description: 'Description',
    price: '500'
  };

  componentWillMount() {
    console.log('EditProduct componentWillMount() ', this.props);

    this.setState({name: this.props.location.state.name});
    this.setState({color: this.props.location.state.color});
    this.setState({size: this.props.location.state.size});
    this.setState({description: this.props.location.state.description});
    this.setState({price: this.props.location.state.price});
  }

  nameValueChanged = (e) => {
    const name = e.target.value;
    this.setState({name});
  }

  colorValueChanged = (e) => {
    const color = e.target.value;
    this.setState({color});
  }

  sizeValueChanged = (e) => {
    const size = e.target.value;
    this.setState({size});
  }

  descriptionValueChanged = (e) => {
    const description = e.target.value;
    this.setState({description});
  }

  priceValueChanged = (e) => {
    const price = e.target.value;
    this.setState({price});
  }

  saveClicked = () => {
    this.props.dispatch(editProduct(this.props.match.params.pid, this.state.name, this.state.color, this.state.size, this.state.description, this.state.price))
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
        <EditProductComponent {...this.state}
        onNameValueChanged={this.nameValueChanged}
        onColorValueChanged={this.colorValueChanged}
        onSizeValueChanged={this.sizeValueChanged}
        onDescriptionValueChanged={this.descriptionValueChanged}
        onPriceValueChanged={this.priceValueChanged}
        onSaveClicked={this.saveClicked}
        onBackClicked={this.backClicked}
    />
    );
  }
}

export default connect(
)(EditProduct)
