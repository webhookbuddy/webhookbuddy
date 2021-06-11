import { Timestamp } from 'firebase/firestore';
import { Forward } from './Forward';

export interface Webhook {
  id: string;
  createdAt: Timestamp;
  method: string;
  ipAddress: string;
  contentType: string | null;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: string | null;
  reads: Record<string, boolean | undefined>;
  forwards: Forward[];
}
