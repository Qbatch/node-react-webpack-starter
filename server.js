require('./src/database.js');

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";

const app = express();
import config from './webpack.config.babel.js';

const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
  };

const compiler = webpack(config);
  
// console.log ("\nHi, it is due to Nodemon\n\n\n\n\n\n\n\n\n");

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res, next) => {
    const filename = "./build/index.html";

    console.log ("filename = " + filename);
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      // console.log ("\n\n\n\n\nInside1\n\n\n\n\n");
      if (err) {
        // console.log ("\n\n\n\n\nInside12_\n\n\n\n\n");
          return next(err);
      }

      // console.log ("\n\n\n\n\nInside2\n\n\n\n\n");

      res.set('content-type', 'text/html');
      
      // console.log ("\n\n\n\n\nInside3\n\n\n\n\n");
      
      res.send(result);
      
      // console.log ("\n\n\n\n\nInside4\n\n\n\n\n");
      
      res.end();
    });

    // console.log ("\n\n\n\n\nCleared\n\n\n\n\n");
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});