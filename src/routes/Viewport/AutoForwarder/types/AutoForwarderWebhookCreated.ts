/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: AutoForwarderWebhookCreated
// ====================================================

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_reads_reader {
  __typename: "User";
  id: string;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_reads {
  __typename: "Read";
  reader: AutoForwarderWebhookCreated_webhookCreated_webhook_reads_reader;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_headers[];
  query: AutoForwarderWebhookCreated_webhookCreated_webhook_forwards_query[];
  body: string | null;
}

export interface AutoForwarderWebhookCreated_webhookCreated_webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: AutoForwarderWebhookCreated_webhookCreated_webhook_headers[];
  query: AutoForwarderWebhookCreated_webhookCreated_webhook_query[];
  contentType: string | null;
  body: string | null;
  reads: AutoForwarderWebhookCreated_webhookCreated_webhook_reads[];
  forwards: AutoForwarderWebhookCreated_webhookCreated_webhook_forwards[];
}

export interface AutoForwarderWebhookCreated_webhookCreated {
  __typename: "CreateWebhookPayload";
  webhook: AutoForwarderWebhookCreated_webhookCreated_webhook;
}

export interface AutoForwarderWebhookCreated {
  webhookCreated: AutoForwarderWebhookCreated_webhookCreated;
}

export interface AutoForwarderWebhookCreatedVariables {
  endpointId: string;
}
