function insertItem(previousArray, actionArray) {
  const newArray = previousArray.map(item => item);

  const _actionArray = actionArray.map(item => (Object.assign({
    id: item.id,
    name: item.name,
    color: item.color,
    size: item.size,
    description: item.description,
    price: item.price,
    quantity: 1
  })));

  _actionArray.map(item => newArray.push(item));

  return newArray;
}

function removeItem(array, value) {
  let newArray = array.filter(item => value !== item.id);
  return newArray;
}

function incrementQuantity(arr, id, quantity) {
  const newArray = arr.map(item => ({
    ...item,
    quantity: item.id === id ? quantity : item.quantity
  }));

  return newArray;
}

function decrementQuantity(arr, id, quantity) {
  const newArray = arr.map(item => ({
    ...item,
    quantity: item.id === id ? quantity : item.quantity
  }));

  return newArray;
}

export default function reducer(state = {
  cart: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'ADD_TO_CART': case 'CREATE_CHARGE': case 'CHECKOUT': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'ADD_TO_CART_REJECTED': case 'CREATE_CHARGE_REJECTED': case 'CHECKOUT_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'CREATE_CHARGE_FULLFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: action.payload
      };
    }
    case 'ADD_TO_CART_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: insertItem(state.cart, action.payload)
      };
    }
    case 'REMOVE_FROM_CART_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: removeItem(state.cart, action.payload)
      };
    }
    case 'INCREMENT_QUANTITY_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: incrementQuantity(state.cart, action.payload, action.quantity)
      };
    }
    case 'DECREMENT_QUANTITY_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: decrementQuantity(state.cart, action.payload, action.quantity)
      };
    }
    case 'CHECKOUT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        cart: []
      };
    }
    default: {
      return state;
    }
  }
}
