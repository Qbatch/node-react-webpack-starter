import { combineReducers } from 'redux';

import user from './userReducer';
import products from './productReducer';
import cart from './cartReducer';

export default combineReducers({
  user,
  products,
  cart
});
