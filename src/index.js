// import * as my_math from './my_math.js';

import {
  sum as my_math_sum,
  sub as my_math_sub,
  mul as my_math_mul,
  div as my_math_div
} from './my_math.js';

import './image_viewer.js';

// import React from 'react';
// import ReactDOM from 'react-dom';

if (module.hot) {  
  module.hot.accept();
}

// console.log ("\n\n\n Hello\n\n\n");

let num1 = 5;
let num2 = 10;

let sumTotal = my_math_sum (num1, num2);
let subTotal = my_math_sub (num1, num2);
let mulTotal = my_math_mul (num1, num2);
let divTotal = my_math_div (num1, num2);

console.log (`Sum = ${sumTotal}`);
console.log (`Sub = ${subTotal}`);
console.log (`Mul = ${mulTotal}`);
console.log (`Div = ${divTotal}`);

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );