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

export const ENDPOINT_FRAGMENT = gql`
  fragment endpoint on Endpoint {
    id
    createdAt
    url
    name
  }
`;
