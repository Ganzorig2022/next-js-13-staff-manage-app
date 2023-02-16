import { gql } from '@apollo/client';

export const UPDATE_SINGLE_USER = gql`
  mutation UpdateUser(
    $email: String!
    $username: String
    $phone: String
    $birthDate: String
    $address: String
    $gender: String
    $role: String
  ) {
    updateUser(
      email: $email
      username: $username
      phone: $phone
      birthDate: $birthDate
      address: $address
      gender: $gender
      role: $role
    ) {
      email
      username
      phone
      birthDate
      address
      gender
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation CreateUser(
    $username: String
    $email: String
    $phone: String
    $birthDate: String
    $gender: String
    $address: String
    $role: String
  ) {
    createUser(
      username: $username
      email: $email
      phone: $phone
      birthDate: $birthDate
      gender: $gender
      address: $address
      role: $role
    ) {
      username
      email
      phone
      birthDate
      gender
      address
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      success
    }
  }
`;
export const DELETE_USER_BY_ID = gql`
  mutation DeleteUserById($id: String!) {
    deleteUserById(id: $id) {
      success
    }
  }
`;
