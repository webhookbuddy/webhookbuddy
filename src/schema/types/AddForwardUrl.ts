/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddForwardUrlInput } from "./../../types/global-types";

// ====================================================
// GraphQL mutation operation: AddForwardUrl
// ====================================================

export interface AddForwardUrl_addForwardUrl_forwardUrl {
  __typename: "ForwardUrl";
  url: string;
}

export interface AddForwardUrl_addForwardUrl {
  __typename: "AddForwardUrlPayload";
  forwardUrl: AddForwardUrl_addForwardUrl_forwardUrl;
}

export interface AddForwardUrl {
  addForwardUrl: AddForwardUrl_addForwardUrl;
}

export interface AddForwardUrlVariables {
  input: AddForwardUrlInput;
}
