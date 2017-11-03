// import * as my_math from './my_math.js';

// import React from "react";
// import ReactDOM from "react-dom";

// import {BrowserRouter, Route, Switch} from "react-router-dom";

// import '../styles/image_viewer.scss';

// import Layout from "./js/components/Layout.js";

// import Layout from "./js/pages/Layout.js";
// import Featured from "./js/pages/Featured.js";
// import Archives from "./js/pages/Archives.js";
// import Settings from "./js/pages/Settings.js";

// import {applyMiddleware, combineReducers, createStore} from "redux";
// import axios from "axios";
// import {createLogger} from "redux-logger";
// import thunk from "redux-thunk";
// import promise from "redux-promise-middleware";

import "./js/client.js"

if (module.hot) {  
  module.hot.accept();
}

// const initialState = {
//   fetching: false,
//   fetched: false,
//   users: [],
//   error: null,
// }

// const reducer = (state=initialState, action) => {
//   switch(action.type) {
//     case "FETCH_USERS_PENDING": {
//       return {...state, fetching: true};
//       break;
//     }
//     case "FETCH_USERS_REJECTED": {
//       return {...state, fetching: false, error: action.payload}
//       break;
//     }
//     case "FETCH_USERS_FULFILLED": {
//       return {...state, fetching: false, fetched: true, users: action.payload}
//       break;
//     }
//   }
//   return state;
// }

// const middleware = applyMiddleware (promise (), thunk, createLogger ());

// const store = createStore (reducer, middleware);

// store.dispatch ({
//   type: "FETCH_USERS",
//   payload: axios.get("http://rest.learncode.academy/api/wstern/users")
// })

// store.dispatch ((dispatch) => {
//   dispatch ({type: "FETCH_USERS_START"})
//   axios.get("http://rest.leakqgwadsholkrncode.academy/api/wstern/users")
//     .then((response) => {
//       dispatch ({type: "RECEIVE_USERS", payload: response.data})
//     })
//     .catch((err) => {
//       dispatch ({type: "FETCH_USERS_ERROR", payload: err})
//     })
// })

// const reducer = (state, action) => {
//   if (action.type == "INC")
//     return state + action.payload;

//   else if (action.type == "DEC")
//     return state - action.payload;

//   else if (action.type === "ERR")
//     throw new Error ("AAA");

//   else
//    return state;
// }

// const logger = (store) => (next) => (action) => {
//   console.log ("logger => Action Fired ", action);
//   next (action);
// }

// const error = (store) => (next) => (action) => {
//   try {
//     console.log ("error => Action Fired ", action);
//     next (action);
//   } catch (e) {
//     console.log ("AHHHHH!!", e);
//   }
// }

// const middleware = applyMiddleware (logger, error);

// const store = createStore (reducer, 0, middleware);

// store.subscribe (() => {
//   console.log ("Store Changed " , store.getState ());
// })

// store.dispatch ({type: "INC", payload: 1})
// store.dispatch ({type: "INC", payload: 2})
// store.dispatch ({type: "INC", payload: 22})
// store.dispatch ({type: "INC", payload: 1})
// store.dispatch ({type: "DEC", payload: 1000})
// store.dispatch ({type: "ERR"})

/*
const userReducer = (state={}, action) => {
  switch (action.type)
  {
    case "CHANGE_NAME": {
      state = {...state, name: action.payload};
      break;
    }
    case "CHANGE_AGE": {
      state = {...state, age: action.payload};
      break;
    }
  }

  return state;
}

const tweetsReducer = (state=[], action) => {
  return state;
}

const reducers = combineReducers ({
  user: userReducer,
  tweets: tweetsReducer
})

const store = createStore (reducers);

store.subscribe (() => {
  console.log ("Store Changed " ,store.getState ());
})

store.dispatch ({type: "CHANGE_NAME", payload: "Bilal"})
store.dispatch ({type: "CHANGE_AGE", payload: 35})
store.dispatch ({type: "CHANGE_AGE", payload: 37})
*/
// For Components
// const app = document.getElementById('app');
// ReactDOM.render(<Layout/>, app);

// For Pages
// const app = document.getElementById('app');
// ReactDOM.render(
//   <BrowserRouter>
//     <div>
//       <Route component={Layout}/>
//       <Switch>
//         <Route exact path='/' component={Featured}/>
//         <Route exact path='/archives' component={Archives}/>
//         <Route exact path='/settings' component={Settings}/>
//       </Switch>
     
//     </div>
//   </BrowserRouter>,
//   app);

// import {
//   sum as my_math_sum,
//   sub as my_math_sub,
//   mul as my_math_mul,
//   div as my_math_div
// } from './my_math.js';

// import './image_viewer.js';

// import React from 'react';
// import ReactDOM from 'react-dom';

// // console.log ("\n\n\n\n\n Hello\n\n\n\n\n");

// let num1 = 5;
// let num2 = 10;

// let sumTotal = my_math_sum (num1, num2);
// let subTotal = my_math_sub (num1, num2);
// let mulTotal = my_math_mul (num1, num2);
// let divTotal = my_math_div (num1, num2);

// console.log (`Sum = ${sumTotal}`);
// console.log (`Sub = ${subTotal}`);
// console.log (`Mul = ${mulTotal}`);
// console.log (`Div = ${divTotal}`);

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );