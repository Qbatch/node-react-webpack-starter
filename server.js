import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import path from 'path';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.babel';

const compiler = webpack(config);
const app = express();

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

const DIST_DIR = path.join(__dirname, 'build');

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');

app.use('/api', authCheckMiddleware);

// console.log('\n\nHi,\nIm\nServer\n\n');
// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:3000/'
  }
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
  const filename = path.join(DIST_DIR, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

// // Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});
