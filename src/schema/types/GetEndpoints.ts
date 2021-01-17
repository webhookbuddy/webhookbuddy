/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEndpoints
// ====================================================

export interface GetEndpoints_endpoints {
  __typename: "Endpoint";
  id: string;
  createdAt: any;
  url: string;
  name: string;
}

export interface GetEndpoints {
  endpoints: GetEndpoints_endpoints[];
}
