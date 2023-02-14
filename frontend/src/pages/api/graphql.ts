import { ApolloClient, gql } from '@apollo/client';

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
  .then(() => apolloServer.createHandler({ path: '' }));

// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/api/graphql',
//   credentials: 'include',
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });
