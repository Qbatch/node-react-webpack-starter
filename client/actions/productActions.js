import axios from 'axios';
import querystring from 'querystring';

import Auth from '../modules/Auth';

export function clearProductsAction() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_PRODUCTS_FULFILLED', payload: null });
  };
}

export function fetchProductsLength() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_LENGTH' });

    axios.get('http://localhost:3000/api/products_length/', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'FETCH_PRODUCTS_LENGTH_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'FETCH_PRODUCTS_LENGTH_REJECTED', payload: err });
    });
  };
}

export function fetchProducts(skip, size) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS' });

    axios.get(`http://localhost:3000/api/products/${skip}/${size}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'FETCH_PRODUCTS_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'FETCH_PRODUCTS_REJECTED', payload: err });
    });
  };
}

export function fetchProductsBySellerIdLength(id) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_LENGTH' });

    axios.get(`http://localhost:3000/api/products_length/${id}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'FETCH_PRODUCTS_LENGTH_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'FETCH_PRODUCTS_LENGTH_REJECTED', payload: err });
    });
  };
}

export function fetchProductsBySellerId(id, skip, size) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS' });

    axios.get(`http://localhost:3000/api/products/${id}/${skip}/${size}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'FETCH_PRODUCTS_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'FETCH_PRODUCTS_REJECTED', payload: err });
    });
  };
}

export function addProduct(name, color, size, description, price, sellerID) {
  return (dispatch) => {
    dispatch({ type: 'ADD_PRODUCT' });

    axios.post('http://localhost:3000/api/add_product/', querystring.stringify({
      name,
      color,
      size,
      description,
      price,
      sellerID
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'ADD_PRODUCT_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'ADD_PRODUCT_REJECTED', payload: err });
    });
  };
}

export function editProduct(id, name, color, size, description, price) {
  return (dispatch) => {
    dispatch({ type: 'EDIT_PRODUCT' });

    axios.post('http://localhost:3000/api/edit_product/', querystring.stringify({
      id,
      name,
      color,
      size,
      description,
      price
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'EDIT_PRODUCT_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'EDIT_PRODUCT_REJECTED', payload: err });
    });
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    dispatch({ type: 'DEL_PRODUCT' });

    axios.post('http://localhost:3000/api/del_product/', querystring.stringify({
      id
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    }).then((response) => {
      dispatch({ type: 'DEL_PRODUCT_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'DEL_PRODUCT_REJECTED', payload: err });
    });
  };
}
