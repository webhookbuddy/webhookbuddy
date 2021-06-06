/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadWebhookInput } from "./../../types/global-types";

// ====================================================
// GraphQL mutation operation: ReadWebhook
// ====================================================

export interface ReadWebhook_readWebhook_webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface ReadWebhook_readWebhook_webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface ReadWebhook_readWebhook_webhook_reads_reader {
  __typename: "User";
  id: string;
}

export interface ReadWebhook_readWebhook_webhook_reads {
  __typename: "Read";
  reader: ReadWebhook_readWebhook_webhook_reads_reader;
}

export interface ReadWebhook_readWebhook_webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface ReadWebhook_readWebhook_webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface ReadWebhook_readWebhook_webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface ReadWebhook_readWebhook_webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: ReadWebhook_readWebhook_webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: ReadWebhook_readWebhook_webhook_forwards_headers[];
  query: ReadWebhook_readWebhook_webhook_forwards_query[];
  body: string | null;
}

export interface ReadWebhook_readWebhook_webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: ReadWebhook_readWebhook_webhook_headers[];
  query: ReadWebhook_readWebhook_webhook_query[];
  contentType: string | null;
  body: string | null;
  reads: ReadWebhook_readWebhook_webhook_reads[];
  forwards: ReadWebhook_readWebhook_webhook_forwards[];
}

export interface ReadWebhook_readWebhook {
  __typename: "ReadWebhookPayload";
  webhook: ReadWebhook_readWebhook_webhook;
}

export interface ReadWebhook {
  readWebhook: ReadWebhook_readWebhook;
}

export interface ReadWebhookVariables {
  input: ReadWebhookInput;
}
