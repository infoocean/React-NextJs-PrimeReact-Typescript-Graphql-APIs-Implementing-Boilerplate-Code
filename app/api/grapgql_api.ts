import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, concat, createHttpLink,  split } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from '@apollo/client/utilities';

// setting configuration for http connect for Query and Mutation
const httpLink = createHttpLink({
  uri: `http://localhost:3001/graphql`,
});

// setting configuration for websocket connect for subscription
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:3001/graphql`,
  })
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authorization_token');
  const logintoken = localStorage.getItem('x-access-token');
  const authHeaders: any = {};
  // Set authorization header if token is available
  if (token) {
    authHeaders['authorization'] = `Bearer ${token}`;
  }
  // Set x-access-token header if logintoken is available
  if (logintoken) {
    authHeaders['x-access-token'] = logintoken;
  }
  return {
    headers: {
      ...headers,
      ...authHeaders
    }
  };
});

const httpAuthLink = concat(authLink, httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // web socket connection for subscriptions
  httpAuthLink // http connection for query and mutation
);

// setting up apollo client with the server http and websocket links
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(), // for in memory caching of data
});

export default client;