/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEndpointInput } from "./../../../../../../types/global-types";

// ====================================================
// GraphQL mutation operation: CreateEndpoint
// ====================================================

export interface CreateEndpoint_createEndpoint_endpoint {
  __typename: "Endpoint";
  id: string;
  createdAt: any;
  url: string;
  name: string;
}

export interface CreateEndpoint_createEndpoint {
  __typename: "CreateEndpointPayload";
  endpoint: CreateEndpoint_createEndpoint_endpoint;
}

export interface CreateEndpoint {
  createEndpoint: CreateEndpoint_createEndpoint;
}

export interface CreateEndpointVariables {
  input: CreateEndpointInput;
}
