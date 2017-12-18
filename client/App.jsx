import React from 'react';

import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';

import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import LogOut from './containers/LogOut';

// import NotFound from './components/NotFound.jsx';

import AddProduct from './containers/AddProduct';
import EditProduct from './containers/EditProduct';
import DisplayCart from './containers/DisplayCart';
import Payment from './containers/Payment';

import { history, store } from './store';

const App = () => {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/sigin" component={SignIn} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/sessionexpired" component={Profile} />
              <Route exact path="/logout" component={LogOut} />
              <Route exact path="/add_product/:id" component={AddProduct} />
              <Route exact path="/edit_product/:id/:pid" component={EditProduct} />
              <Route exact path="/displayCart/:id" component={DisplayCart} />
              <Route exact path="/payment/:id" component={Payment} />
              {/* <Route path="*" component={NotFound} /> */}
            </div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    </AppContainer>
  // <Provider store={store}>
    //   <BrowserRouter>
    //     <div>
    //       <Switch>
    //         <Route exact path="/" component={Home} />
    //         <Route exact path="/signup" component={SignUp} />
    //         <Route exact path="/login" component={SignIn} />
    //         <Route exact path="/profile/:id" component={Profile} />
    //         <Route exact path="/sessionexpired" component={Profile} />
    //         <Route exact path="/logout" component={LogOut} />
    //         <Route exact path="/add_product/:id" component={AddProduct} />
    //         <Route exact path="/edit_product/:id/:pid" component={EditProduct} />
    //         <Route exact path="/displayCart/:id" component={DisplayCart} />
    //         <Route exact path="/payment/:id" component={Payment} />
    //         <Route path="*" component={NotFound} />
    //       </Switch>
    //     </div>
    //   </BrowserRouter>
    // </Provider>
  );
};

export default App;
