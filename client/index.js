import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App.jsx';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjbw6bp6m1a0r0191pdt19g2g'
  // uri: 'http://localhost:3000/graphiql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  // <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </BrowserRouter>
  , document.getElementById('app')
);
registerServiceWorker();
/*
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import './styles/style.scss';

if (module.hot) {
  module.hot.accept();
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
*/
