/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WebhooksDeleted
// ====================================================

export interface WebhooksDeleted_webhooksDeleted {
  __typename: "DeleteWebhooksPayload";
  webhookIds: string[];
}

export interface WebhooksDeleted {
  webhooksDeleted: WebhooksDeleted_webhooksDeleted;
}

export interface WebhooksDeletedVariables {
  endpointId: string;
}
