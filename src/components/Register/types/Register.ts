/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./../../../types/global-types";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "Token";
  token: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: RegisterInput;
}
