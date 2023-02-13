import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date

  type Movie {
    title: String
    director: String
  }

  type Query {
    movies: [Movie]
  }

  #   type User {
  #     id: String
  #     username: String
  #   }

  #   type Query {
  #     searchUsers(username: String!): [User]
  #   }

  #   type Mutation {
  #     createUsername(username: String!): CreateUsernameResponse
  #   }

  #   type CreateUsernameResponse {
  #     success: Boolean
  #     error: String
  #   }
`;

export default typeDefs;
