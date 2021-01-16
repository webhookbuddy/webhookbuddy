/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../../types/global-types";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "Token";
  token: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
