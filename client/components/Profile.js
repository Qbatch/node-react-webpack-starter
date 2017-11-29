import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/userActions';
import { fetchProducts, fetchProductsBySellerId, deleteProduct } from '../actions/productActions';
import { addToCart, removeFromCart } from '../actions/cartActions';

import Auth from '../modules/Auth';

@connect((store) => {
  return {
    users: store.users.users,
    products: store.products.products,
    cart: store.cart.cart
  };
})
export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      userFetched: false
    };
  }

  componentWillMount() {
    // console.log('componentWillMount()');

    this.props.dispatch(fetchUser(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps()');

    const {users} = nextProps;
    const {cart} = nextProps;

    if (users) {
      if (this.state.userFetched == false) {
        this.setState({userFetched: true})

        if (users.role == 'Seller') {
          // console.log('Seller');
          this.props.dispatch(fetchProductsBySellerId(nextProps.match.params.id))
        } else if (users.role == 'Buyer') {
          // console.log('Buyer');
          this.props.dispatch(fetchProducts())
        } 
      }
    }
  }

  logoutClicked() {
    // console.log('logoutClicked()');

    this.props.history.push('/logout');
  }

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

    const {users} = this.props;
    if (users.role == 'Seller') {
      // console.log('Seller');
      this.props.dispatch(fetchProductsBySellerId(this.props.match.params.id))
    } else if (users.role == 'Buyer') {
      // console.log('Buyer');
      this.props.dispatch(fetchProducts())
    }

    this.props.dispatch(fetchProducts(this.props.match.params.id))
  }

  addToCart = (id) => {
    // console.log('addToCart() ', id);
    
    this.props.dispatch(addToCart(id));
  }

  removeFromCart = (id) => {
    // console.log('removeFromCart() ', id);
    
    this.props.dispatch(removeFromCart(id));
  }

  displayCart = () => {
    this.props.history.push(`/displayCart/${this.props.match.params.id}`);
  }

  isInCart = (id) => {
    const {cart} = this.props;

    var obj = cart.filter((item) => item.id === id )[0];

    if(obj)
      return true;

    return false;
  }

  render() {
    // console.log('render ()');

    const {users} = this.props;
    const {products} = this.props;
    const {cart} = this.props;

    return <div>
      <div>
        <div>
        <h1>Profile</h1>
        <h2>ID: {users.id}</h2>
        <h2>Name: {users.name}</h2>
        <h2>Age: {users.age}</h2>
        <h2>UserName: {users.username}</h2>
        <h2>Password: {users.password}</h2>
        <h2>Email: {users.email}</h2>
        <h2>Role: {users.role}</h2>
        </div>
        <div>
          <button onClick={this.logoutClicked.bind(this)}>Logout</button>
        </div>
      </div>
      <div>
        {users.role == 'Buyer' && 
          <div>
            <h2>{cart.length} <button onClick={() => this.displayCart()}>Cart</button></h2>
          </div>
        }
        <div>
          <h2>Products</h2>
            {products && products.map((item, index) => (
            <span key={index}>
              <h4> Name: {item.name}, Color: {item.color}, Size: {item.size}, Description: {item.description}, Price: {item.price}
                {users.role == 'Seller' && 
                  <div>
                    <button onClick={() => this.editProduct(item.id)}>Edit</button>
                    <button onClick={() => this.deleteProduct(item.id)}>Delete</button>
                  </div>
                }
                {users.role == 'Buyer' && 
                  <div>
                    {this.isInCart(item.id)?
                    <button onClick={() => this.removeFromCart(item.id)}>Remove From Cart</button> :
                    <button onClick={() => this.addToCart(item.id)}>Add To Cart</button>
                    }
                  </div>
                }
              </h4>
            </span>
            ))}
        </div>
        {users.role == 'Seller' &&
          <div>
          <button onClick={() => this.addProduct()}>Add</button>
          </div>
        }
      </div>
    </div>;
  }
}