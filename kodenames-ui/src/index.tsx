import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';

import GlobalStyles from './main/resources/styles/GlobalStyles';
import * as serviceWorker from './serviceWorker';
import introspectionQueryResultData from './main/ts/generated/fragment-matcher.json';
import { Routes } from './main/ts/Routes';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

const webSocketLink = new WebSocketLink({
  uri: `ws://192.168.3.4:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.error('Apollo Client onError:');
      console.error('graphQLErrors: ', graphQLErrors);
      console.error('networkError: ', networkError);
    }),
    webSocketLink,
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <Routes />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
