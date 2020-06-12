import gql from 'graphql-tag';
import { ENDPOINT_FRAGMENT } from './fragments';

export const GET_ENDPOINTS = gql`
  query getEndpoints {
    endpoints {
      ...endpoint
    }
  }
  ${ENDPOINT_FRAGMENT}
`;
