import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  productsLength: -1,
  products: [],
  fetching: false,
  fetched: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      console.log('In LOCATION_CHANGE PRODUCTS_REDUCER');
      return initialState;
    }
    case 'FETCH_PRODUCTS_LENGTH': case 'FETCH_PRODUCTS': case 'ADD_PRODUCT': case 'EDIT_PRODUCT': case 'DEL_PRODUCT': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'FETCH_PRODUCTS_LENGTH_REJECTED': case 'FETCH_PRODUCTS_REJECTED': case 'ADD_PRODUCT_REJECTED': case 'EDIT_PRODUCT_REJECTED': case 'DEL_PRODUCT_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_PRODUCTS_LENGTH_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        productsLength: action.payload
      };
    }
    case 'FETCH_PRODUCTS_FULFILLED': case 'DEL_PRODUCT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.payload
      };
    }
    case 'ADD_PRODUCT_FULFILLED': case 'EDIT_PRODUCT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true
      };
    }
    case 'CLEAR_PRODUCTS_FULFILLED': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
