import { User } from './types/User';

export interface KeyValue {
  __typename: 'KeyValue';
  key: string;
  value: string;
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
  __typename: 'Webhook';
  description: string;
  ipAddress: string;
  forwards: Forward[];
  reads: [Read];
}

export interface Forward extends HttpMessage {
  __typename: 'Forward';
  url: string;
  statusCode: number;
  success: boolean;
  user: User;
}

export interface Read {
  __typename: 'Read';
  reader: User;
}
