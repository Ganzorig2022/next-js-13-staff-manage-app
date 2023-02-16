import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query GetSingleUser($email: String) {
    getSingleUser(email: $email) {
      email
      username
      phone
      birthDate
      address
      gender
    }
  }
`;
