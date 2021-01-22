import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    createdAt
    updatedAt
    firstName
    lastName
    email
  }
`;

export const ENDPOINT_FRAGMENT = gql`
  fragment Endpoint on Endpoint {
    id
    createdAt
    url
    name
  }
`;

export const FORWARD_FRAGMENT = gql`
  fragment Forward on Forward {
    id
    createdAt
    user {
      ...User
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
  fragment Webhook on Webhook {
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
    reads {
      reader {
        id
      }
    }
    forwards {
      ...Forward
    }
  }
  ${FORWARD_FRAGMENT}
`;
