export default function reducer(state = {
  users: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'SIGNUP_USER': case 'SIGNIN_USER': case 'FETCH_USER': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'SIGNUP_USER_REJECTED': case 'SIGNIN_USER_REJECTED': case 'FETCH_USER_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'SIGNUP_USER_FULFILLED': case 'SIGNIN_USER_FULFILLED': case 'FETCH_USER_FULFILLED': {
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
