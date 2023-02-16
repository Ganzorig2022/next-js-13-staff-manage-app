import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: String
    email: String
    username: String
    phone: String
    birthDate: String
    address: String
    gender: String
    role: String
  }

  type IsSuccess {
    success: Boolean
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
      role: String
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
      role: String
    ): User
  }
  type Mutation {
    deleteUser(email: String!): IsSuccess
  }
  type Mutation {
    deleteUserById(id: String!): IsSuccess
  }
`;

export default typeDefs;
