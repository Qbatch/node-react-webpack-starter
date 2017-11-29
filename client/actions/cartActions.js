import axios from 'axios';
import querystring from 'querystring';
import Auth from '../modules/Auth';

export function addToCart(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3000/api/cart/product/${id}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    })
      .then((response) => {
        dispatch({ type: 'ADD_TO_CART_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TO_CART_REJECTED', payload: err });
      });
  };
}

export function removeFromCart(data) {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_FROM_CART_FULFILLED', payload: data });
  };
}

export function incrementQuantity(id, quantity) {
  return (dispatch) => {
    dispatch({ type: 'INCREMENT_QUANTITY_FULFILLED', payload: id, quantity });
  };
}

export function decrementQuantity(id, quantity) {
  return (dispatch) => {
    dispatch({ type: 'DECREMENT_QUANTITY_FULFILLED', payload: id, quantity });
  };
}

export function createCharge(id, amount) {
  return (dispatch) => {
    axios.post(
      'http://localhost:3000/api/cart/charge/',
      querystring.stringify({
        id,
        amount
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `bearer ${Auth.getToken()}`
        }
      }
    ).then((response) => {
      dispatch({ type: 'CREATE_CHARGE_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'CREATE_CHARGE_REJECTED', payload: err });
    });
  };
}

export function checkOut(data, userId, totalPrice) {
  return (dispatch) => {
    axios.post(
      'http://localhost:3000/api/cart/checkout/',
      querystring.stringify({
        data: JSON.stringify(data),
        userId,
        totalPrice
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `bearer ${Auth.getToken()}`
        }
      }
    ).then((response) => {
      dispatch({ type: 'CHECKOUT_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'CHECKOUT_REJECTED', payload: err });
    });
  };
}
