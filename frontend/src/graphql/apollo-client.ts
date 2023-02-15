import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'cache-and-network',
  //   },
  //   query: {
  //     fetchPolicy: 'network-only',
  //     errorPolicy: 'all',
  //   },
  // },
});
