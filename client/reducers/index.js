import { combineReducers } from 'redux';

import users from './userReducer';
import products from './productReducer';
import cart from './cartReducer';

export default combineReducers({
  users,
  products,
  cart
});
