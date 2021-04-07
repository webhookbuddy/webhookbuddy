/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetForwardUrls
// ====================================================

export interface GetForwardUrls_forwardUrls {
  __typename: "ForwardUrl";
  url: string;
}

export interface GetForwardUrls {
  forwardUrls: GetForwardUrls_forwardUrls[];
}

export interface GetForwardUrlsVariables {
  endpointId: string;
}
