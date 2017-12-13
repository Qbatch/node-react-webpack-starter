import React from 'react';
import { connect } from 'react-redux';

import AddProductComponent from '../components/AddProduct.jsx';

import { addProduct } from '../actions/productActions';
import Auth from '../modules/Auth';

class AddProduct extends React.Component {
  state = {
    name: "Name...",
    color: "Color...",
    size: 'Size...',
    description: 'Description...',
    price: '500'
  };

  componentWillMount() {
    console.log('AddProduct componentWillMount() ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps = ', nextProps);
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
    this.props.dispatch(addProduct(this.state.name, this.state.color, this.state.size, this.state.description, this.state.price, this.props.match.params.id))
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
        <AddProductComponent {...this.state}
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
)(AddProduct)
