import axios from 'axios';
import querystring from 'querystring';

import Auth from '../modules/Auth';

export function signUp(name, age, username, email, password) {
  return (dispatch) => {
    axios.post('http://localhost:3000/auth/signup/', querystring.stringify({
      name,
      age,
      username,
      email,
      password
    })).then((response) => {
      // console.log('Fulfilled');
      dispatch({ type: 'SIGNUP_USER_FULFILLED', payload: response.data });
    }).catch((err) => {
      // console.log('Rejected');
      dispatch({ type: 'SIGNUP_USER_REJECTED', payload: err });
    });
  };
}

export function signIn(email, password) {
  return (dispatch) => {
    axios.post('http://localhost:3000/auth/login/', querystring.stringify({
      email,
      password
    })).then((response) => {
      // console.log('Fulfilled');
      dispatch({ type: 'SIGNIN_USER_FULFILLED', payload: response.data });
    }).catch((err) => {
      // console.log('Rejected');
      dispatch({ type: 'SIGNIN_USER_REJECTED', payload: err });
    });
  };
}

export function fetchUser(userId) {
  return (dispatch) => {
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
