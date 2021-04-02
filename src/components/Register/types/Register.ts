/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from './../../../types/global-types';

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_Register {
  __typename: 'Token';
  token: string;
}

export interface Register {
  register: Register_Register;
}

export interface RegisterVariables {
  input: RegisterInput;
}
