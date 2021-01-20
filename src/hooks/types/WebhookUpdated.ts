/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WebhookUpdated
// ====================================================

export interface WebhookUpdated_webhookUpdated_webhook_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: WebhookUpdated_webhookUpdated_webhook_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: WebhookUpdated_webhookUpdated_webhook_forwards_headers[];
  query: WebhookUpdated_webhookUpdated_webhook_forwards_query[];
  body: string | null;
}

export interface WebhookUpdated_webhookUpdated_webhook {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: WebhookUpdated_webhookUpdated_webhook_headers[];
  query: WebhookUpdated_webhookUpdated_webhook_query[];
  contentType: string | null;
  body: string | null;
  read: boolean;
  forwards: WebhookUpdated_webhookUpdated_webhook_forwards[];
}

export interface WebhookUpdated_webhookUpdated {
  __typename: "UpdateWebhookPayload";
  webhook: WebhookUpdated_webhookUpdated_webhook;
}

export interface WebhookUpdated {
  webhookUpdated: WebhookUpdated_webhookUpdated;
}

export interface WebhookUpdatedVariables {
  endpointId: string;
}
