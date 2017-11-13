export default function reducer(state = {
  users: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'SIGNUP_USER': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'SIGNUP_USER_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'SIGNUP_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    case 'SIGNIN_USER': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'SIGNIN_USER_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'SIGNIN_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    case 'FETCH_USER': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'FETCH_USER_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
