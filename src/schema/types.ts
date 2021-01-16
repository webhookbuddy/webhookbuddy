export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EndpointsPayload {
  endpoints: Endpoint[];
}

export interface Endpoint {
  id: string;
  createdAt: Date;
  url: string;
  name: string;
}

export interface PageInfo {
  endCursor: number;
  hasNextPage: boolean;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface WebhookConnection {
  nodes: Webhook[];
  pageInfo: PageInfo;
}

export interface WebhooksPayload {
  webhooks: WebhookConnection;
}

export interface HttpMessage {
  id: string;
  createdAt: Date;
  method: string;
  headers: KeyValue[];
  query: KeyValue[];
  contentType?: string;
  body?: string;
}

export interface Webhook extends HttpMessage {
  description: string;
  ipAddress: string;
  read: boolean;
  forwards: Forward[];
}

export interface Forward extends HttpMessage {
  url: string;
  statusCode: number;
  success: boolean;
  user: User;
}

export interface ForwardUrl {
  url: string;
}

export interface ForwardUrlPayload {
  forwardUrls: ForwardUrl[];
}
