/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddForwardInput } from "./../../types/global-types";

// ====================================================
// GraphQL mutation operation: AddForward
// ====================================================

export interface AddForward_addForward_webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AddForward_addForward_webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AddForward_addForward_webhook_reads_reader {
  __typename: "User";
  id: string;
}

export interface AddForward_addForward_webhook_reads {
  __typename: "Read";
  reader: AddForward_addForward_webhook_reads_reader;
}

export interface AddForward_addForward_webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface AddForward_addForward_webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AddForward_addForward_webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AddForward_addForward_webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: AddForward_addForward_webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: AddForward_addForward_webhook_forwards_headers[];
  query: AddForward_addForward_webhook_forwards_query[];
  body: string | null;
}

export interface AddForward_addForward_webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: AddForward_addForward_webhook_headers[];
  query: AddForward_addForward_webhook_query[];
  contentType: string | null;
  body: string | null;
  reads: AddForward_addForward_webhook_reads[];
  forwards: AddForward_addForward_webhook_forwards[];
}

export interface AddForward_addForward {
  __typename: "AddForwardPayload";
  webhook: AddForward_addForward_webhook;
}

export interface AddForward {
  addForward: AddForward_addForward;
}

export interface AddForwardVariables {
  input: AddForwardInput;
}
