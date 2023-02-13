// import { createYoga, createSchema } from 'graphql-yoga';
// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/api/user',
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;
const resolvers = {
  Query: {
    sayHello: () => 'Hello',
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer
  .start()
  .then(() => apolloServer.createHandler({ path: 'api/graphql' }));

// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/api/graphql',
//   credentials: 'include',
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });
