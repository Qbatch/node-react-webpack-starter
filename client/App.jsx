import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import Layout from './components/Layout';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import LogOut from './components/LogOut';
import NotFound from './components/NotFound';

import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import DisplayCart from './components/DisplayCart';
import Payment from './components/Payment';

import store from './store';

const App = () => {
  return (
    // <StripeProvider apiKey="pk_test_N70AAGbzbSQoUJAaPdytmaND">
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Layout} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/sessionexpired" component={Profile} />
              <Route exact path="/logout" component={LogOut} />
              <Route exact path="/add_product/:id" component={AddProduct} />
              <Route exact path="/edit_product/:id/:pid" component={EditProduct} />
              <Route exact path="/displayCart/:id" component={DisplayCart} />
              <Route exact path="/payment/:id" component={Payment} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    // </StripeProvider>
  );
};

export default App;
