import React from 'react';
import { connect } from 'react-redux';

import { editProduct } from '../actions/productActions';
import Auth from '../modules/Auth';

@connect((store) => {
  return {
    users: store.users.users,
    products: store.products.products
  };
})
export default class EditProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "...Name",
      color: "...Color",
      size: '...Size',
      description: '...Description',
      price: '500'
    };
  }

  nameValueChanged(e) {
    const name = e.target.value;
    this.setState({name});
  }

  colorValueChanged(e) {
    const color = e.target.value;
    this.setState({color});
  }

  sizeValueChanged(e) {
    const size = e.target.value;
    this.setState({size});
  }

  descriptionValueChanged(e) {
    const description = e.target.value;
    this.setState({description});
  }

  priceValueChanged(e) {
    const price = e.target.value;
    this.setState({price});
  }

  saveClicked() {
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
    <div>
      <h1>
        Edit Product
      </h1>
      <div>
        Name: <input value={this.state.name} onChange={this.nameValueChanged.bind(this)}/>
      </div>
      <div>
        Color: <input value={this.state.color} onChange={this.colorValueChanged.bind(this)}/>
      </div>
      <div>
        Size: <input value={this.state.size} onChange={this.sizeValueChanged.bind(this)}/>
      </div>
      <div>
        Description: <input value={this.state.description} onChange={this.descriptionValueChanged.bind(this)}/>
      </div>
      <div>
        Price: <input value={this.state.price} onChange={this.priceValueChanged.bind(this)}/>
      </div>
      <div>
        <button onClick={this.saveClicked.bind(this)}>Save</button>
        <button onClick={() => this.backClicked()}>Back</button>
      </div>
    </div>
    );
  }
}