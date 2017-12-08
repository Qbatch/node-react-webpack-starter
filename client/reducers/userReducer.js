const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

const userReducer = (state = initialState, action) => {
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
        ...action.payload
      };
    }
    case 'CLEAR_USER_FULFILLED': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
