import axios from 'axios';
import querystring from 'querystring';

import Auth from '../modules/Auth';

export function signUpAction(name, age, username, email, password, role) {
  return (dispatch) => {
    dispatch({ type: 'SIGNUP_USER' });

    axios.post('http://localhost:3000/auth/signup/', querystring.stringify({
      name,
      age,
      username,
      email,
      password,
      role
    })).then((response) => {
      dispatch({ type: 'SIGNUP_USER_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_USER_REJECTED', payload: err });
    });
  };
}

export function signInAction(email, password) {
  return (dispatch) => {
    dispatch({ type: 'SIGNIN_USER' });

    axios.post('http://localhost:3000/auth/login/', querystring.stringify({
      email,
      password
    })).then((response) => {
      dispatch({ type: 'SIGNIN_USER_FULFILLED', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'SIGNIN_USER_REJECTED', payload: err });
    });
  };
}

export function fetchUser(userId) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_FULFILLED' });

    axios.get(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`
      }
    })
      .then((response) => {
        dispatch({ type: 'FETCH_USER_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err });
      });
  };
}
