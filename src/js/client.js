import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {BrowserRouter, Route, Switch} from "react-router-dom"
// import { renderRoutes } from 'react-router-config';
// import createBrowserHistory from 'history/createBrowserHistory'

import Layout from "./components/Layout"
import Profile from "./components/Profile"
import NotFound from "./components/NotFound"
import SignIn from "./components/SignIn"

import store from "./store"

// import routes from './routes';

// const history = createBrowserHistory()
const app = document.getElementById('app')
// const AppRouter = () => {
//     return (
//       <Provider store={store}>
//         <BrowserRouter>
//           {renderRoutes(routes)}
//         </BrowserRouter>
//       </Provider>
//     )
// }

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>{/*<Router history={history}>*/}
            <div>
            <Switch>
                <Route exact path='/' component={Layout}/>
                <Route exact path='/sign_in' component={SignIn}/>
                <Route exact path='/home' component={Profile}/>
                <Route exact path='/profile/:id' component={Profile}/>
                <Route exact path='/logout/:id' component={Profile}/>
                <Route path='*' component={NotFound}/>
            </Switch>
            </div>
        </BrowserRouter>{/* </Router> */}
    </Provider>, app
);
// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//           {renderRoutes(routes)}
//         </BrowserRouter>
//     </Provider>,
//     app
// );