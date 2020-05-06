import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    createdAt
    updatedAt
    firstName
    lastName
    email
  }
`;
