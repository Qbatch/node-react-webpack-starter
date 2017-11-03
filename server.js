// require('./src/database.js');

import path from 'path';
import config from './webpack.config.babel.js';
import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";

import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

import store from "./src/js/store.js"
import routes from './src/js/routes.js';

import passport from 'passport';
// import {BasicStrategy} from 'passport-http';

import bodyParser from 'body-parser';

import {User} from './src/database.js';

// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
// passport.use(new BasicStrategy(
//   function(username, password, cb) {

//     console.log ("\n\nGoing\n\nfor\n\nQuery\n\n");
    
//     User.findOne({ where: {username: username} }).then(user => {
//       // project will be the first entry of the Projects table with the title 'aProject' || null
      
//       // If No Data Found
//       if (!user) { console.log ("\n\n\nNo Match Found\n\n\n"); return cb(null, false); }
//       // If Data Matched but Password is in correct
//       if (user.password != password) { console.log ("\n\n\nPassword Not Matched\n\n\n"); return cb(null, false); }
//       // Data Successfully Matched
//       console.log ("\n\n\nUser Matched\n\n\n");
//       return cb(null, user);
//     }).catch (err => { 
//       console.log ("\n\n\nIn Catch\n\n\n"); 
//       return cb(err);
//     })
//   }
// ));

const compiler = webpack(config);
const app = express();
const router = express.Router();
const DIST_DIR = path.join(__dirname, "build");

// tell the app to look for static files in these directories
// app.use(express.static('./server/static/'));
// app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
// const localSignupStrategy = require('./src/js/server/passport/local-signup');
const localLoginStrategy = require('./src/js/server/passport/local-login');
// passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./src/js/server/middleware/auth-check');
app.use('/apii', authCheckMiddleware);

// routes
const authRoutes = require('./src/js/server/routes/auth');
const apiRoutes = require('./src/js/server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// used to serialize the user for the session
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// used to deserialize the user
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//       done(err, user);
//   });
// });

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// app.get('/abc',
// passport.authenticate('basic', { session: false }),
// function(req, res) {
//   res.json({ username: req.user.username, password: req.user.password, email: req.user.email });
// });

app.route('/api/users/')
  .get((req, res) => {
    console.log ("Fetch All Users");
  User.findAll().then((user) => {
      res.json(user);
  });
})

app.route('/login/:email/:password')
.get((req, res) => {
  console.log ("Login User " , req.params);

  User.findOne({
    where: {email: req.params.email},
  }).then((user) => {
      res.json(user);
  });
})

app.route('/api/users/:userId')
  .get((req, res) => {
    console.log ("Fetch User " , req.params);

    User.findById(req.params.userId).then((user) => {
      res.json(user);
    });
})

app.get("*", (req, res, next) => {
  const filename = path.join(DIST_DIR, "index.html");
  
  console.log ("\n\n\n\n\nfilename = " + filename + " req = " + req.session);
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
        return next(err);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

// app.get("/login", passport.authenticate('basic', { session: false }), (req, res, next) => {
//   const filename = path.join(DIST_DIR, "index.html");
  
//       console.log ("\n\n\n\n\nfilename = " + filename + " req = " + req.session);
//       compiler.outputFileSystem.readFile(filename, (err, result) => {
//         if (err) {
//             return next(err);
//         }
  
//         res.set('content-type', 'text/html');
//         res.send(result);
//         res.end();
//       });
// });

// function isLoggedIn(req, res, next) {
//   // if user is authenticated in the session, carry on 
//   if (req.isAuthenticated())
//       return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }

// // Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});