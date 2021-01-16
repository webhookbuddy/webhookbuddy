/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Webhook
// ====================================================

export interface Webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface Webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface Webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: Webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: Webhook_forwards_headers[];
  query: Webhook_forwards_query[];
  body: string | null;
}

export interface Webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: Webhook_headers[];
  query: Webhook_query[];
  contentType: string | null;
  body: string | null;
  read: boolean;
  forwards: Webhook_forwards[];
}
