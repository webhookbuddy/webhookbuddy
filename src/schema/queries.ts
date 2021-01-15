import { gql } from '@apollo/client';
import { ENDPOINT_FRAGMENT, WEBHOOK_FRAGMENT } from './fragments';

export const GET_ENDPOINTS = gql`
  query getEndpoints {
    endpoints {
      ...endpoint
    }
  }
  ${ENDPOINT_FRAGMENT}
`;

export const GET_WEBHOOKS = gql`
  query getWebhooks($endpointId: ID!, $after: Int) {
    webhooks(endpointId: $endpointId, after: $after)
      @connection(key: "webhooks", filter: ["endpointId"]) {
      nodes {
        ...webhook
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;
