import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import path from 'path';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.babel';

import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';

const compiler = webpack(config);
const app = express();

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

const DIST_DIR = path.join('/Users/qbatch/Desktop/node-react-webpack-starter', 'build'); // __dirname

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

app.use('/api', authCheckMiddleware);

console.log('\n\nHi,\nIm\nServer\n\n');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  contentBase: 'http://localhost:3000/',
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
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

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});
