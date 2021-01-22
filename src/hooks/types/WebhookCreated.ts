/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WebhookCreated
// ====================================================

export interface WebhookCreated_webhookCreated_webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookCreated_webhookCreated_webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookCreated_webhookCreated_webhook_reads_reader {
  __typename: "User";
  id: string;
}

export interface WebhookCreated_webhookCreated_webhook_reads {
  __typename: "Read";
  reader: WebhookCreated_webhookCreated_webhook_reads_reader;
}

export interface WebhookCreated_webhookCreated_webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface WebhookCreated_webhookCreated_webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookCreated_webhookCreated_webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookCreated_webhookCreated_webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: WebhookCreated_webhookCreated_webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: WebhookCreated_webhookCreated_webhook_forwards_headers[];
  query: WebhookCreated_webhookCreated_webhook_forwards_query[];
  body: string | null;
}

export interface WebhookCreated_webhookCreated_webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: WebhookCreated_webhookCreated_webhook_headers[];
  query: WebhookCreated_webhookCreated_webhook_query[];
  contentType: string | null;
  body: string | null;
  reads: WebhookCreated_webhookCreated_webhook_reads[];
  forwards: WebhookCreated_webhookCreated_webhook_forwards[];
}

export interface WebhookCreated_webhookCreated {
  __typename: "CreateWebhookPayload";
  webhook: WebhookCreated_webhookCreated_webhook;
}

export interface WebhookCreated {
  webhookCreated: WebhookCreated_webhookCreated;
}

export interface WebhookCreatedVariables {
  endpointId: string;
}
