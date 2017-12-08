const initialState = {
  products: [],
  fetching: false,
  fetched: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS': case 'ADD_PRODUCT': case 'EDIT_PRODUCT': case 'DEL_PRODUCT': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'FETCH_PRODUCTS_REJECTED': case 'ADD_PRODUCT_REJECTED': case 'EDIT_PRODUCT_REJECTED': case 'DEL_PRODUCT_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_PRODUCTS_FULFILLED': case 'ADD_PRODUCT_FULFILLED': case 'EDIT_PRODUCT_FULFILLED': case 'DEL_PRODUCT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.payload
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
