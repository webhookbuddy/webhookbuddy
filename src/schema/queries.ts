import { gql } from '@apollo/client';
import { ENDPOINT_FRAGMENT, WEBHOOK_FRAGMENT } from './fragments';

export const GET_ENDPOINTS = gql`
  query GetEndpoints {
    endpoints {
      ...Endpoint
    }
  }
  ${ENDPOINT_FRAGMENT}
`;

export const GET_WEBHOOKS = gql`
  query GetWebhooks($endpointId: ID!, $after: Int) {
    webhooks(endpointId: $endpointId, after: $after)
      @connection(key: "webhooks", filter: ["endpointId"]) {
      nodes {
        ...Webhook
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;
