import gql from 'graphql-tag';
const typeDefs = gql `
  type User {
    id: String
    email: String
    username: String
    phone: String
    birthDate: String
    address: String
    gender: String
  }

  type Query {
    getSingleUser(email: String): User
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    createUser(
      id: String
      email: String
      username: String
      phone: String
      birthDate: String
      address: String
      gender: String
    ): User
  }

  type Mutation {
    updateUser(
      email: String!
      username: String
      phone: String
      birthDate: String
      address: String
      gender: String
    ): User
  }
`;
export default typeDefs;