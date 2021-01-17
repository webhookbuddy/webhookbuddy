/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteEndpointInput } from "./../../../../../../types/global-types";

// ====================================================
// GraphQL mutation operation: DeleteEndpoint
// ====================================================

export interface DeleteEndpoint_deleteEndpoint {
  __typename: "DeleteEndpointPayload";
  affectedRows: number;
}

export interface DeleteEndpoint {
  deleteEndpoint: DeleteEndpoint_deleteEndpoint;
}

export interface DeleteEndpointVariables {
  input: DeleteEndpointInput;
}
