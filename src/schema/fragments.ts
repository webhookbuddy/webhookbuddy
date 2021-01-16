import { gql } from '@apollo/client';

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

export const FORWARD_FRAGMENT = gql`
  fragment forward on Forward {
    id
    createdAt
    user {
      ...user
    }
    url
    method
    statusCode
    success
    headers {
      key
      value
    }
    query {
      key
      value
    }
    body
  }
  ${USER_FRAGMENT}
`;

export const WEBHOOK_FRAGMENT = gql`
  fragment webhook on Webhook {
    id
    createdAt
    description
    ipAddress
    method
    headers {
      key
      value
    }
    query {
      key
      value
    }
    contentType
    body
    read
    forwards {
      ...forward
    }
  }
  ${FORWARD_FRAGMENT}
`;
