/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Forward
// ====================================================

export interface Forward_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface Forward_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Forward_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Forward {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: Forward_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: Forward_headers[];
  query: Forward_query[];
  body: string | null;
}
