/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWebhooks
// ====================================================

export interface GetWebhooks_webhooks_nodes_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface GetWebhooks_webhooks_nodes_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface GetWebhooks_webhooks_nodes_forwards_user {
  __typename: "User";
  id: string;
  createdAt: any;
  updatedAt: any;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface GetWebhooks_webhooks_nodes_forwards_headers {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface GetWebhooks_webhooks_nodes_forwards_query {
  __typename: "KeyValue";
  key: string;
  value: string | null;
}

export interface GetWebhooks_webhooks_nodes_forwards {
  __typename: "Forward";
  id: string;
  createdAt: any;
  user: GetWebhooks_webhooks_nodes_forwards_user;
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  headers: GetWebhooks_webhooks_nodes_forwards_headers[];
  query: GetWebhooks_webhooks_nodes_forwards_query[];
  body: string | null;
}

export interface GetWebhooks_webhooks_nodes {
  __typename: "Webhook";
  id: string;
  createdAt: any;
  description: string;
  ipAddress: string;
  method: string;
  headers: GetWebhooks_webhooks_nodes_headers[];
  query: GetWebhooks_webhooks_nodes_query[];
  contentType: string | null;
  body: string | null;
  read: boolean;
  forwards: GetWebhooks_webhooks_nodes_forwards[];
}

export interface GetWebhooks_webhooks_pageInfo {
  __typename: "PageInfo";
  endCursor: number | null;
  hasNextPage: boolean;
}

export interface GetWebhooks_webhooks {
  __typename: "WebhookConnection";
  nodes: GetWebhooks_webhooks_nodes[];
  pageInfo: GetWebhooks_webhooks_pageInfo;
}

export interface GetWebhooks {
  webhooks: GetWebhooks_webhooks;
}

export interface GetWebhooksVariables {
  endpointId: string;
  after?: number | null;
}
